import { IsString, Length, Matches, MinLength } from 'class-validator';
import { IApiId } from '../interfaces/api-id.interface';
import { UserPayloadDto } from './user-payload.dto';
import { PASSWORD_REGEX } from 'app/common/constants';

export abstract class ChangePasswordDto
  extends UserPayloadDto
  implements IApiId
{
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
