import { ApiUserIdDto } from './api-user-id.dto';
import { IsInt, IsNumber, Min } from 'class-validator';

export abstract class UserPayloadDto extends ApiUserIdDto {
  @IsNumber()
  @IsInt()
  @Min(0)
  public count!: number;
}
