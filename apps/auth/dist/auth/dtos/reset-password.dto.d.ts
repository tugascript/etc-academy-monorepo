import { PasswordsDto } from './passwords.dto';
export declare abstract class ResetPasswordDto extends PasswordsDto {
    resetToken: string;
}
