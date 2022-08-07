import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNumber, Min } from 'class-validator';
import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';

@InputType('CreateCourseProfileInput')
export class CreateProfileInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public courseId: number;

  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public profileId: number;

  @Field(() => ProfileRoleEnum)
  @IsEnum(ProfileRoleEnum)
  public role: ProfileRoleEnum;

  @Field(() => ProfileStatusEnum)
  @IsEnum(ProfileStatusEnum)
  public status: ProfileStatusEnum;
}
