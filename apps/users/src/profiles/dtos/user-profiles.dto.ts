import { IsInt, IsNumber, Min } from 'class-validator';
import { ApiIdDto } from '../../users/dtos/api-id.dto';

export abstract class UserProfilesDto extends ApiIdDto {
  @IsNumber()
  @IsInt()
  @Min(1)
  public userId!: number;
}
