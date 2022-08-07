import { LessonTypeEnum } from '../enums/lesson-type.enum';
import { LessonDto } from './lesson.dto';
export declare abstract class UpdateLessonTypeDto extends LessonDto {
    lessonType: LessonTypeEnum;
    link?: string;
}
