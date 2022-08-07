import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsString, IsUrl, ValidateIf } from 'class-validator';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
import { LessonDto } from './lesson.dto';

@ArgsType()
export abstract class UpdateLessonTypeDto extends LessonDto {
  @Field(() => LessonTypeEnum)
  @IsEnum(LessonTypeEnum)
  public lessonType: LessonTypeEnum;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsUrl()
  @ValidateIf(
    (obj: UpdateLessonTypeDto) => obj.lessonType === LessonTypeEnum.ONLINE,
  )
  public link?: string;
}
