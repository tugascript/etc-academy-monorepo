import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, Min } from 'class-validator';
import { LessonIdDto } from './lesson-id.dto';

@ArgsType()
export abstract class ResourceDto extends LessonIdDto {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public resourceId: number;
}
