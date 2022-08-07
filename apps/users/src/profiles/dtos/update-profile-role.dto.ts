import { ProfileRoleEnum } from 'src/common/enums';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ProfileDto } from './profile.dto';

@ArgsType()
export abstract class UpdateProfileRoleDto extends ProfileDto {
  @Field(() => ProfileRoleEnum)
  @IsEnum(ProfileRoleEnum)
  public role: ProfileRoleEnum;
}
