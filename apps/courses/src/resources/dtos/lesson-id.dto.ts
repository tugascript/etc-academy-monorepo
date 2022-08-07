import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';

@ArgsType()
export abstract class LessonIdDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public lessonId: number;
}
