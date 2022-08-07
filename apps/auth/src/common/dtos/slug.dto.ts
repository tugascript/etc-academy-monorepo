import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';
import { SLUG_REGEX } from '../constants/regex.constant';

@ArgsType()
export abstract class SlugDto {
  @Field(() => String)
  @IsString()
  @Matches(SLUG_REGEX, { message: 'Invalid slug' })
  @Length(3, 110)
  public slug: string;
}
