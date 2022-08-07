import { IBase } from '../../common/interfaces';
import { CourseTypeEnum } from '../enums/course-type.enum';
export interface ICourse extends IBase {
    name: string;
    slug: string;
    picture?: string;
    description?: string;
    courseType: CourseTypeEnum;
    institutionId: number;
    authorId: number;
}
