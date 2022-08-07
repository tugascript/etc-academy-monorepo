import { Collection } from '@mikro-orm/core';
import { LocalBaseEntity } from '../../common/entities';
import { CourseEntity } from '../../courses/entities/course.entity';
import { CourseProfileEntity } from '../../profiles/entities/course-profile.entity';
import { ResourceEntity } from '../../resources/entities/resource.entity';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
import { ILesson } from '../interfaces/lesson.interface';
export declare class LessonEntity extends LocalBaseEntity implements ILesson {
    title: string;
    available: boolean;
    lessonType: LessonTypeEnum;
    link?: string;
    num: number;
    time: Date;
    course: CourseEntity;
    manager: CourseProfileEntity;
    resources: Collection<ResourceEntity, LessonEntity>;
}
