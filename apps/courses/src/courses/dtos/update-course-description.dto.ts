import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CourseDto } from './course.dto';

@ArgsType()
export abstract class UpdateCourseDescriptionDto extends CourseDto {
  @Field(() => String)
  @IsString()
  @Length(1, 500)
  public description: string;
}
