import { FileUploadDto } from '../../uploader/dtos';
import { CourseDto } from './course.dto';
export declare abstract class UpdateCoursePictureDto extends CourseDto {
    picture: Promise<FileUploadDto>;
}
