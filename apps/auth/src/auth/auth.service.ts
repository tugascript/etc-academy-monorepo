import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { Cache } from 'cache-manager';
import { FastifyReply, FastifyRequest } from 'fastify';
import { v5 as uuidV5 } from 'uuid';

import { EmailService } from '../email/email.service';
import { ChangePasswordDto } from './dtos/update-password.dto';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ConfirmLoginDto } from './dtos/confirm-login.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResetEmailDto } from './dtos/reset-email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import {
  IAccessPayload,
  IAccessPayloadResponse,
} from './interfaces/access-payload.interface';
import { IAuthResult } from './interfaces/auth-result.interface';
import {
  ITokenPayload,
  ITokenPayloadResponse,
} from './interfaces/token-payload.interface';
import { ClientProxy } from '@nestjs/microservices';
import { IMessageUser, IRedisMessage } from '@app/common/interfaces';
import { firstValueFrom, timeout } from 'rxjs';
import { CommonService } from '@app/common';
import { LocalMessageType } from '@app/common/entities/gql';
import { IJwt, ISingleJwt } from '../config/interfaces/jwt.interface';
import { generateToken, verifyToken } from '@app/common/utils';

@Injectable()
export class AuthService {
  private readonly cookieName =
    this.configService.get<string>('REFRESH_COOKIE');
  private readonly url = this.configService.get<string>('url');
  private readonly authNamespace = this.configService.get<string>('AUTH_UUID');
  private readonly testing = this.configService.get<boolean>('testing');
  private readonly refreshTime =
    this.configService.get<number>('jwt.refresh.time');

  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly commonService: CommonService,
    @Inject('USER_SERVICE')
    private readonly usersClient: ClientProxy,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  //____________________ STATIC ____________________

  /**
   * Generate Access Code
   *
   * Generates a 6 char long number string for two-factor auth
   */
  private static generateAccessCode(): string {
    const nums = '0123456789';

    let code = '';
    while (code.length < 6) {
      const i = Math.floor(Math.random() * nums.length);
      code += nums[i];
    }

    return code;
  }

  //____________________ MUTATIONS ____________________

  /**
   * Register User
   *
   * Takes the register input, creates a new user in the db
   * and asynchronously sends a confirmation email
   */
  public async registerUser(dto: RegisterDto): Promise<LocalMessageType> {
    const user = await this.getUserMessage('CREATE_USER', dto);
    await this.sendConfirmationEmail(user);
    return new LocalMessageType('User registered successfully');
  }

  /**
   * Confirm Email
   *
   * Takes a confirmation token, confirms and updates the user
   */
  public async confirmEmail(
    res: FastifyReply,
    { confirmationToken }: ConfirmEmailDto,
  ): Promise<IAuthResult> {
    const { id, count } = (await this.verifyAuthToken(
      confirmationToken,
      'confirmation',
    )) as ITokenPayloadResponse;
    const user = await this.getUserMessage('CONFIRM_USER', { id, count });
    const [accessToken, refreshToken] = await this.generateAuthTokens(user);
    this.saveRefreshCookie(res, refreshToken);
    return { accessToken };
  }

  /**
   * Login User
   *
   * Takes the login input, if two-factor auth is true: it caches a new access code and
   * asynchronously sends it by email. If false, it sends an auth type
   */
  public async loginUser(
    res: FastifyReply,
    dto: LoginDto,
  ): Promise<IAuthResult | LocalMessageType> {
    const user = await this.getUserMessage('LOGIN_USER', dto);

    if (!user.confirmed) {
      this.sendConfirmationEmail(user);
      throw new UnauthorizedException(
        'Please confirm your account. A new email has been sent',
      );
    }

    if (user.twoFactor) {
      const code = AuthService.generateAccessCode();
      await this.commonService.throwInternalError(
        this.cacheManager.set(
          uuidV5(user.email, this.authNamespace),
          await hash(code, 5),
        ),
      );
      this.emailService.sendAccessCode(user, code);
      return new LocalMessageType('Login confirmation code sent');
    }

    const [accessToken, refreshToken] = await this.generateAuthTokens(user);
    this.saveRefreshCookie(res, refreshToken);
    return {
      accessToken,
    };
  }

  /**
   * Confirm Login
   *
   * Takes the confirmation login input, checks the access code
   * and logins the user
   */
  public async confirmLogin(
    res: FastifyReply,
    { email, accessCode }: ConfirmLoginDto,
  ): Promise<IAuthResult> {
    const hashedCode = await this.commonService.throwInternalError(
      this.cacheManager.get<string>(uuidV5(email, this.authNamespace)),
    );

    if (!hashedCode || !(await compare(accessCode, hashedCode)))
      throw new UnauthorizedException('Access code is invalid or has expired');

    const user = await this.getUserMessage('USER_BY_EMAIL', { email });
    const [accessToken, refreshToken] = await this.generateAuthTokens(user);
    this.saveRefreshCookie(res, refreshToken);
    return { accessToken };
  }

  /**
   * Logout User
   *
   * Removes the refresh token from the cookies
   */
  public logoutUser(res: FastifyReply): LocalMessageType {
    res.clearCookie(this.cookieName, { path: '/api/auth/refresh-access' });
    return new LocalMessageType('Logout Successfully');
  }

  /**
   * Refresh Access Token
   *
   * Takes the request and response, and generates new auth tokens
   * based on the current refresh token.
   *
   * It generates both tokens so the user can stay logged in indefinitely
   */
  public async refreshAccessToken(
    req: FastifyRequest,
    res: FastifyReply,
  ): Promise<IAuthResult> {
    const token = req.cookies[this.cookieName];

    if (!token) throw new UnauthorizedException('Invalid refresh token');

    const { valid, value } = res.unsignCookie(token);

    if (!valid) throw new UnauthorizedException('Invalid refresh token');

    const { id, count } = (await this.verifyAuthToken(
      value,
      'refresh',
    )) as ITokenPayloadResponse;
    const user = await this.getUserMessage('USER_BY_PAYLOAD', {
      id,
      count,
    });
    const [accessToken, refreshToken] = await this.generateAuthTokens(user);
    this.saveRefreshCookie(res, refreshToken);

    return { accessToken };
  }

  /**
   * Send Reset Password Email
   *
   * Takes a user email and sends a reset password email
   */
  public async sendResetPasswordEmail({
    email,
  }: ResetEmailDto): Promise<LocalMessageType> {
    let user: IMessageUser;

    try {
      user = await this.getUserMessage('USER_BY_EMAIL', { email });
    } catch (e) {
      return new LocalMessageType('Password reset email sent');
    }

    if (user) {
      const resetToken = await this.generateAuthToken(
        { id: user.id, count: user.count },
        'resetPassword',
      );
      const url = `${this.url}/reset-password/${resetToken}/`;
      this.emailService.sendPasswordResetEmail(user, url);
    }

    return new LocalMessageType('Password reset email sent');
  }

  /**
   * Reset Password
   *
   * Resets password given a reset password jwt token
   */
  public async resetPassword({
    resetToken,
    password1,
    password2,
  }: ResetPasswordDto): Promise<LocalMessageType> {
    const { id, count } = (await this.verifyAuthToken(
      resetToken,
      'resetPassword',
    )) as ITokenPayloadResponse;

    if (password1 !== password2)
      throw new BadRequestException('Passwords do not match');

    await this.getUserMessage('CHANGE_USER_PASSWORD', {
      id,
      count,
      password1,
      password2,
    });
    return new LocalMessageType('Password reseted successfully');
  }

  /**
   * Update Password
   *
   * Change current user password
   */
  public async updatePassword(
    res: FastifyReply,
    userId: number,
    { password, password1, password2 }: ChangePasswordDto,
  ): Promise<IAuthResult> {
    const user = await this.getUserMessage('UPDATE_USER_PASSWORD', {
      userId,
      password,
      password1,
      password2,
    });
    const [accessToken, refreshToken] = await this.generateAuthTokens(user);
    this.saveRefreshCookie(res, refreshToken);

    return { accessToken };
  }

  /**
   * Verify Auth Token
   *
   * A generic jwt verifier that verifies all token needed for auth
   */
  public async verifyAuthToken(
    token: string,
    type: keyof IJwt,
  ): Promise<ITokenPayloadResponse | IAccessPayloadResponse> {
    const secret = this.configService.get<string>(`jwt.${type}.secret`);

    try {
      return await verifyToken(
        token,
        secret,
        type === 'access' ? ['RS256'] : ['HS256'],
      );
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  /**
   * Send Confirmation Email
   *
   * Sends an email for the user to confirm
   * his account after registration
   */
  private async sendConfirmationEmail(user: IMessageUser): Promise<string> {
    const emailToken = await this.generateAuthToken(
      { id: user.id, count: user.count },
      'confirmation',
    );
    const url = `${this.url}/confirm-email/${emailToken}/`;
    await this.emailService.sendConfirmationEmail(user, url);
    return emailToken;
  }

  /**
   * Generate Auth Tokens
   *
   * Generates an array with both the access and
   * refresh token.
   *
   * This function takes advantage of Promise.all.
   */
  private async generateAuthTokens({
    id,
    count,
  }: IMessageUser): Promise<[string, string]> {
    return Promise.all([
      this.generateAuthToken({ id }, 'access'),
      this.generateAuthToken({ id, count }, 'refresh'),
    ]);
  }

  /**
   * Generate Jwt Token
   *
   * A generic jwt generator that generates all tokens needed
   * for auth (access, refresh, confirmation & resetPassword)
   */
  private async generateAuthToken(
    payload: ITokenPayload | IAccessPayload,
    type: keyof IJwt,
  ): Promise<string> {
    const { secret, time } = this.configService.get<ISingleJwt>(`jwt.${type}`);

    return await this.commonService.throwInternalError(
      generateToken(
        payload,
        secret,
        time,
        type === 'access' ? 'RS256' : 'HS256',
      ),
    );
  }

  /**
   * Save Refresh Cookie
   *
   * Saves the refresh token as a http only cookie to
   * be used for refreshing the access token
   */
  private saveRefreshCookie(res: FastifyReply, token: string): void {
    res.cookie(this.cookieName, token, {
      secure: !this.testing,
      httpOnly: true,
      signed: true,
      path: '/api/auth/refresh-access',
      expires: new Date(Date.now() + this.refreshTime),
    });
  }

  private async getUserMessage(
    cmd: string,
    input: Record<string, any>,
  ): Promise<IMessageUser> {
    const message = await this.commonService.throwInternalError(
      firstValueFrom(
        this.usersClient
          .send<IRedisMessage<IMessageUser | string>>(
            { cmd },
            {
              apiId: this.authNamespace,
              ...input,
            },
          )
          .pipe(timeout(2000)),
      ),
    );

    if (message.status === 'error')
      throw new BadRequestException(message.message as string);

    return message.message as IMessageUser;
  }
}
