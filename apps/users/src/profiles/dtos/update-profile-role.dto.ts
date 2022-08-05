import { ArgsType, Field } from '@nestjs/graphql';
import { ProfileDto } from './profile.dto';
import { ProfileRoleEnum } from '@app/common/enums';
import { IsEnum } from 'class-validator';

@ArgsType()
export abstract class UpdateProfileRoleDto extends ProfileDto {
  @Field(() => ProfileRoleEnum)
  @IsEnum(ProfileRoleEnum)
  public role: ProfileRoleEnum;
}
