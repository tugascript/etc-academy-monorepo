import { LocalMessageType } from 'src/common/entities/gql';
import { IAccessUser } from 'src/common/interfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ConfirmLoginDto } from './dtos/confirm-login.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResetEmailDto } from './dtos/reset-email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ChangePasswordDto } from './dtos/update-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(registerDto: RegisterDto): Promise<LocalMessageType>;
    confirmEmail(res: FastifyReply, confirmEmailDto: ConfirmEmailDto): Promise<void>;
    loginUser(res: FastifyReply, loginDto: LoginDto): Promise<void>;
    confirmLogin(res: FastifyReply, confirmLoginDto: ConfirmLoginDto): Promise<void>;
    logoutUser(res: FastifyReply): void;
    refreshAccessToken(req: FastifyRequest, res: FastifyReply): Promise<void>;
    sendResetPasswordEmail(resetEmailDto: ResetEmailDto): Promise<LocalMessageType>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<LocalMessageType>;
    updatePassword(res: FastifyReply, user: IAccessUser, changePasswordDto: ChangePasswordDto): Promise<void>;
}
