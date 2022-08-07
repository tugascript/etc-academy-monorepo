import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseDto } from './course.dto';
export declare abstract class UpdateCourseTypeDto extends CourseDto {
    courseType: CourseTypeEnum;
}
