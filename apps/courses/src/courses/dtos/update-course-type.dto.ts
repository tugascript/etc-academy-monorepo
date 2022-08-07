import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseDto } from './course.dto';

@ArgsType()
export abstract class UpdateCourseTypeDto extends CourseDto {
  @Field(() => CourseTypeEnum)
  @IsEnum(CourseTypeEnum)
  public courseType: CourseTypeEnum;
}
