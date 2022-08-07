import { NAME_REGEX } from 'src/common/constants';
import { ProfileRoleEnum, ProfileStatusEnum } from 'src/common/enums';
import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

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

  @Field(() => String)
  @IsString()
  @Matches(NAME_REGEX, { message: "User's name should be valid" })
  @Length(3, 100)
  public userName: string;

  @Field(() => ProfileRoleEnum)
  @IsEnum(ProfileRoleEnum)
  public role: ProfileRoleEnum;

  @Field(() => ProfileStatusEnum)
  @IsEnum(ProfileStatusEnum)
  public status: ProfileStatusEnum;
}
