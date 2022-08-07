import { Collection } from '@mikro-orm/core';
import { LocalBaseEntity } from '../../common/entities';
import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';
import { CourseEntity } from '../../courses/entities/course.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
import { ICourseProfile } from '../interfaces/course-profile.interface';
export declare class CourseProfileEntity extends LocalBaseEntity implements ICourseProfile {
    slug: string;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
    userId: number;
    institutionProfileId: number;
    institutionId: number;
    course: CourseEntity;
    managedLessons: Collection<LessonEntity, CourseProfileEntity>;
}
