import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { ProfileStatusEnum } from '../../common/enums';
import { ProfileDto } from './profile.dto';

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
