import { LessonTypeEnum } from '../enums/lesson-type.enum';
export declare class CreateLessonInput {
    courseId: number;
    title: string;
    lessonType: LessonTypeEnum;
    time: string;
    link?: string;
}
