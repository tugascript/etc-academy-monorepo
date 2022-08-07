import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';
import { SLUG_REGEX } from '../../common/constants';
import { CourseDto } from '../../courses/dtos/course.dto';

@ArgsType()
export abstract class ProfileSlugDto extends CourseDto {
  @Field(() => String)
  @IsString()
  @Matches(SLUG_REGEX, { message: 'Invalid slug' })
  @Length(3, 110)
  public slug: string;
}
