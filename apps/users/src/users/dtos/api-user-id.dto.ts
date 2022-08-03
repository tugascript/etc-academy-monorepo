import { ApiIdDto } from './api-id.dto';
import { IsInt, IsNumber, Min } from 'class-validator';

export abstract class ApiUserIdDto extends ApiIdDto {
  @IsNumber()
  @IsInt()
  @Min(1)
  public userId!: number;
}
