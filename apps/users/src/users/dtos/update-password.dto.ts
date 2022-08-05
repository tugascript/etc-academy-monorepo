import { IsString, Length, Matches, MinLength } from 'class-validator';
import { PASSWORD_REGEX } from '@app/common/constants';
import { IApiId } from '../interfaces/api-id.interface';
import { ApiUserIdDto } from './api-user-id.dto';

export abstract class UpdatePasswordDto extends ApiUserIdDto implements IApiId {
  @IsString()
  @MinLength(1)
  public password!: string;

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
