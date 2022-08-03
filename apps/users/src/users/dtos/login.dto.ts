import { ApiIdDto } from './api-id.dto';
import { IApiId } from '../interfaces/api-id.interface';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export abstract class LoginDto extends ApiIdDto implements IApiId {
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(250)
  public email!: string;

  @IsString()
  @MinLength(1)
  public password!: string;
}
