import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ProfileRoleEnum, ProfileStatusEnum } from 'app/common/enums';

@InputType('CreateProfileInput')
export abstract class CreateProfileInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public institutionId: number;

  @Field(() => String)
  @IsString()
  @IsEmail()
  @Length(6, 250)
  public userEmail: string;

  @Field(() => ProfileRoleEnum)
  @IsEnum(ProfileRoleEnum)
  public role: ProfileRoleEnum;

  @Field(() => ProfileStatusEnum)
  @IsEnum(ProfileStatusEnum)
  public status: ProfileStatusEnum;
}
