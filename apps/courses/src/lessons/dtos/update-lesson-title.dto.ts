import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length, Matches } from 'class-validator';
import { TITLE_REGEX } from '../../common/constants';
import { LessonDto } from './lesson.dto';

@ArgsType()
export abstract class UpdateLessonTitleDto extends LessonDto {
  @Field(() => String)
  @IsString()
  @Matches(TITLE_REGEX)
  @Length(3, 150)
  public title: string;
}
