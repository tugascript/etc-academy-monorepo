import { EntityManager } from '@mikro-orm/postgresql';
import { MercuriusContext } from 'mercurius';
import { CommonService } from '../common';
import { FilterRelationDto } from '../common/dtos';
import { ILoader, IPaginated } from '../common/interfaces';
import { CourseEntity } from '../courses/entities/course.entity';
import { LessonEntity } from '../lessons/entities/lesson.entity';
import { CourseProfileEntity } from '../profiles/entities/course-profile.entity';
import { ResourceEntity } from '../resources/entities/resource.entity';
import { ICourseProfileReference } from './interfaces/course-profile-referece.interface';
import { ICourseReference } from './interfaces/course-reference.interface';
import { ILessonReference } from './interfaces/lesson-reference.interface';
import { IResourcesReference } from './interfaces/resources-reference.interface';
export declare class LoadersService {
    private readonly em;
    private readonly commonService;
    constructor(em: EntityManager, commonService: CommonService);
    private static getEntities;
    private static getEntityIds;
    private static getRelationIds;
    private static getEntityMap;
    private static getResults;
    getLoaders(): {
        Course: {
            __resolveReference: (items: ILoader<ICourseReference, undefined>[], _: MercuriusContext) => Promise<CourseEntity[]>;
            profiles: (items: ILoader<CourseEntity, FilterRelationDto>[], _: MercuriusContext) => Promise<IPaginated<CourseProfileEntity>[]>;
            lessons: (items: ILoader<CourseEntity, FilterRelationDto>[], _: MercuriusContext) => Promise<IPaginated<LessonEntity>[]>;
        };
        Lesson: {
            __resolveReference: (items: ILoader<ILessonReference, undefined>[], _: MercuriusContext) => Promise<LessonEntity[]>;
            course: (items: ILoader<LessonEntity, undefined>[], _: MercuriusContext) => Promise<CourseEntity[]>;
            manager: (items: ILoader<LessonEntity, undefined>[], _: MercuriusContext) => Promise<CourseProfileEntity[]>;
            resources: (items: ILoader<LessonEntity, undefined>[], _: MercuriusContext) => Promise<ResourceEntity[][]>;
        };
        CourseProfile: {
            __resolveReference: (items: ILoader<ICourseProfileReference, undefined>[], _: MercuriusContext) => Promise<CourseProfileEntity[]>;
            course: (items: ILoader<CourseProfileEntity, undefined>[], _: MercuriusContext) => Promise<CourseEntity[]>;
            managedLessons: (items: ILoader<CourseProfileEntity, FilterRelationDto>[], _: MercuriusContext) => Promise<IPaginated<LessonEntity>[]>;
        };
        LessonResource: {
            __resolveReference: (items: ILoader<IResourcesReference, undefined>[], _: MercuriusContext) => Promise<ResourceEntity[]>;
            lesson: (items: ILoader<ResourceEntity, undefined>[], _: MercuriusContext) => Promise<LessonEntity[]>;
        };
    };
    private loadCoursesReferences;
    private loadCoursesProfiles;
    private loadCoursesLessons;
    private loadLessonsReferences;
    private loadLessonsCourse;
    private loadLessonsManager;
    private loadLessonsResources;
    private loadCourseProfilesReferences;
    private loadCourseProfilesCourse;
    private loadCourseProfilesManagedLessons;
    private loadResourcesReferences;
    private loadResourcesLesson;
    private loadReferences;
    private basicPaginator;
}
