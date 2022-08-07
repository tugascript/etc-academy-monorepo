import { Collection } from '@mikro-orm/core';
import { LocalBaseEntity } from '../../common/entities';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
import { CourseProfileEntity } from '../../profiles/entities/course-profile.entity';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { ICourse } from '../interfaces/course.interface';
export declare class CourseEntity extends LocalBaseEntity implements ICourse {
    name: string;
    slug: string;
    courseType: CourseTypeEnum;
    picture?: string;
    description?: string;
    institutionId: number;
    authorId: number;
    profiles: Collection<CourseProfileEntity, CourseEntity>;
    lessons: Collection<LessonEntity, CourseEntity>;
}
