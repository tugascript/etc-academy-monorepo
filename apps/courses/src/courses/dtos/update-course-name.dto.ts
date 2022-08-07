import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';
import { NAME_REGEX } from '../../common/constants';
import { CourseDto } from './course.dto';

@ArgsType()
export abstract class UpdateCourseNameDto extends CourseDto {
  @Field(() => String)
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name: string;
}
