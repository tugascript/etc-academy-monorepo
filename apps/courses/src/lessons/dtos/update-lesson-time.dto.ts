import { ArgsType, Field } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';
import { LessonDto } from './lesson.dto';

@ArgsType()
export abstract class UpdateLessonTimeDto extends LessonDto {
  @Field(() => String)
  @IsDateString()
  public time: string;
}
