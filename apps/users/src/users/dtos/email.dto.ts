import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export abstract class EmailDto {
  @Field(() => String)
  @IsEmail()
  @MinLength(6)
  @MaxLength(250)
  public email: string;
}
