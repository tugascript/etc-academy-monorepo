import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';
import { CourseDto } from '../../courses/dtos/course.dto';

@ArgsType()
export abstract class LessonDto extends CourseDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public lessonId: number;
}
