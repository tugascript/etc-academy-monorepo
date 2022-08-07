import { CommonService } from 'src/common';
import { LocalMessageType } from 'src/common/entities/gql';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IJwt } from '../config/interfaces/jwt.interface';
import { EmailService } from '../email/email.service';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ConfirmLoginDto } from './dtos/confirm-login.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResetEmailDto } from './dtos/reset-email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/update-password.dto';
import { IAccessPayloadResponse } from './interfaces/access-payload.interface';
import { IAuthResult } from './interfaces/auth-result.interface';
import { ITokenPayloadResponse } from './interfaces/token-payload.interface';
export declare class AuthService {
    private readonly configService;
    private readonly emailService;
    private readonly commonService;
    private readonly usersClient;
    private readonly cacheManager;
    private readonly cookieName;
    private readonly url;
    private readonly authNamespace;
    private readonly testing;
    private readonly refreshTime;
    constructor(configService: ConfigService, emailService: EmailService, commonService: CommonService, usersClient: ClientProxy, cacheManager: Cache);
    private static generateAccessCode;
    registerUser(dto: RegisterDto): Promise<LocalMessageType>;
    confirmEmail(res: FastifyReply, { confirmationToken }: ConfirmEmailDto): Promise<IAuthResult>;
    loginUser(res: FastifyReply, dto: LoginDto): Promise<IAuthResult | LocalMessageType>;
    confirmLogin(res: FastifyReply, { email, accessCode }: ConfirmLoginDto): Promise<IAuthResult>;
    logoutUser(res: FastifyReply): LocalMessageType;
    refreshAccessToken(req: FastifyRequest, res: FastifyReply): Promise<IAuthResult>;
    sendResetPasswordEmail({ email, }: ResetEmailDto): Promise<LocalMessageType>;
    resetPassword({ resetToken, password1, password2, }: ResetPasswordDto): Promise<LocalMessageType>;
    updatePassword(res: FastifyReply, userId: number, { password, password1, password2 }: ChangePasswordDto): Promise<IAuthResult>;
    verifyAuthToken(token: string, type: keyof IJwt): Promise<ITokenPayloadResponse | IAccessPayloadResponse>;
    private sendConfirmationEmail;
    private generateAuthTokens;
    private generateAuthToken;
    private saveRefreshCookie;
    private getUserMessage;
    private getMessageProfiles;
}