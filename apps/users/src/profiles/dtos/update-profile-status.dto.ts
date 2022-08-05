import { ArgsType, Field } from '@nestjs/graphql';
import { ProfileDto } from './profile.dto';
import { ProfileStatusEnum } from 'app/common/enums';
import { IsEnum, IsIn } from 'class-validator';

@ArgsType()
export abstract class UpdateProfileStatusDto extends ProfileDto {
  @Field(() => ProfileStatusEnum)
  @IsEnum(ProfileStatusEnum)
  @IsIn([
    ProfileStatusEnum.ENROLLED,
    ProfileStatusEnum.STUDYING,
    ProfileStatusEnum.GRADUATED,
  ])
  public status: ProfileStatusEnum;
}
