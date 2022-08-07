import { FileUploadDto } from '../../uploader/dtos';
import { CourseTypeEnum } from '../enums/course-type.enum';
export declare class CreateCourseInput {
    institutionId: number;
    name: string;
    courseType: CourseTypeEnum;
    description?: string;
    picture?: Promise<FileUploadDto>;
}
