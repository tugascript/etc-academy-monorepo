import { NAME_REGEX } from 'src/common/constants';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { PasswordsDto } from './passwords.dto';

export abstract class RegisterDto extends PasswordsDto {
  @IsString()
  @Length(3, 100, {
    message: 'Name has to be between 3 and 50 characters.',
  })
  @Matches(NAME_REGEX, {
    message: 'Name can only contain letters, dots, numbers and spaces.',
  })
  public name!: string;

  @IsString()
  @IsEmail()
  public email!: string;
}
