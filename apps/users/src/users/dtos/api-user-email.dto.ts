import { ApiIdDto } from './api-id.dto';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export abstract class ApiUserEmailDto extends ApiIdDto {
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(250)
  public email!: string;
}
