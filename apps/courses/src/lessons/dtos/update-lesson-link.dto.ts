import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';
import { LessonDto } from './lesson.dto';

@ArgsType()
export abstract class UpdateLessonLinkDto extends LessonDto {
  @Field(() => String)
  @IsString()
  @IsUrl()
  public link: string;
}
