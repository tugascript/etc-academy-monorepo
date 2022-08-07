import { IBase } from '../../common/interfaces';
import { ICourse } from '../../courses/interfaces/course.interface';
import { ICourseProfile } from '../../profiles/interfaces/course-profile.interface';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
export interface ILesson extends IBase {
    title: string;
    time: Date;
    num: number;
    link?: string;
    course: ICourse;
    manager: ICourseProfile;
    available: boolean;
    lessonType: LessonTypeEnum;
}
