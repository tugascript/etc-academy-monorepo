import { PasswordsDto } from './passwords.dto';
export declare abstract class RegisterDto extends PasswordsDto {
    name: string;
    email: string;
}
