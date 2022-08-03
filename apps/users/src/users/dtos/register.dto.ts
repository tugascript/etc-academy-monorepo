import {
  IsEmail,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { NAME_REGEX, PASSWORD_REGEX } from 'app/common/constants';

export abstract class RegisterDto {
  @IsString()
  @IsUUID('4')
  public apiId!: string;

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

  @IsString()
  @Length(8, 35)
  @Matches(PASSWORD_REGEX, {
    message:
      'Password requires a lowercase letter, an uppercase letter, and a number or symbol',
  })
  public password1!: string;

  @IsString()
  @MinLength(1)
  public password2!: string;
}
