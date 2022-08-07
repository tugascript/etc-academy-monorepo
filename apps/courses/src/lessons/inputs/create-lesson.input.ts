import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';
import { TITLE_REGEX } from '../../common/constants';
import { LessonTypeEnum } from '../enums/lesson-type.enum';

@InputType('CreateLessonInput')
export class CreateLessonInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @Min(1)
  public courseId: number;

  @Field(() => String)
  @IsString()
  @Matches(TITLE_REGEX)
  @Length(3, 150)
  public title: string;

  @Field(() => LessonTypeEnum)
  @IsEnum(LessonTypeEnum)
  public lessonType: LessonTypeEnum;

  @Field(() => String)
  @IsDateString()
  public time: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsUrl()
  @ValidateIf(
    (obj: CreateLessonInput) => obj.lessonType === LessonTypeEnum.ONLINE,
  )
  public link?: string;
}
