import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Type } from '@nestjs/common';
import { MercuriusContext } from 'mercurius';
import { CommonService } from '../common';
import { FilterRelationDto } from '../common/dtos';
import { IBase, ILoader, IPaginated, IReference } from '../common/interfaces';
import { CourseEntity } from '../courses/entities/course.entity';
import { LessonEntity } from '../lessons/entities/lesson.entity';
import { CourseProfileEntity } from '../profiles/entities/course-profile.entity';
import { ResourceEntity } from '../resources/entities/resource.entity';
import { ICourseProfileReference } from './interfaces/course-profile-referece.interface';
import { ICourseReference } from './interfaces/course-reference.interface';
import { ILessonReference } from './interfaces/lesson-reference.interface';
import { IResourcesReference } from './interfaces/resources-reference.interface';

@Injectable()
export class LoadersService {
  constructor(
    private readonly em: EntityManager,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Get Entities
   *
   * Maps the entity object to the entity itself.
   */
  private static getEntities<T extends IBase, P = undefined>(
    items: ILoader<T, P>[],
  ): T[] {
    const entities: T[] = [];

    for (let i = 0; i < items.length; i++) {
      entities.push(items[i].obj);
    }

    return entities;
  }

  /**
   * Get Entity IDs
   *
   * Maps the entity object to an array of IDs.
   */
  private static getEntityIds<T extends IBase | IReference, P = undefined>(
    items: ILoader<T, P>[],
  ): number[] {
    const ids: number[] = [];

    for (let i = 0; i < items.length; i++) {
      const id = items[i].obj.id;
      ids.push(typeof id === 'string' ? parseInt(id, 10) : id);
    }

    return ids;
  }

  /**
   * Get Relation IDs
   *
   * Maps the entity object many-to-one relation to an array of IDs.
   */
  private static getRelationIds<T extends IBase, P = undefined>(
    items: ILoader<T, P>[],
    relationName: string,
  ): number[] {
    const ids: number[] = [];

    for (let i = 0; i < items.length; i++) {
      ids.push(items[i].obj[relationName].id);
    }

    return ids;
  }

  /**
   * Get Entity Map
   *
   * Turns an array of entity objects to a map of entity objects
   * with its ID as the key.
   */
  private static getEntityMap<T extends IBase>(entities: T[]): Map<number, T> {
    const map = new Map<number, T>();

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      map.set(entity.id, entity);
    }

    return map;
  }

  /**
   * Get Results
   *
   * With the IDs of the relation id array, gets the results of the map.
   */
  private static getResults<T>(
    ids: number[],
    map: Map<number, T>,
    defaultValue: T | null = null,
  ): T[] {
    const results: T[] = [];

    for (let i = 0; i < ids.length; i++) {
      results.push(map.get(ids[i]) ?? defaultValue);
    }

    return results;
  }

  public getLoaders() {
    return {
      Course: {
        __resolveReference: this.loadCoursesReferences(),
        profiles: this.loadCoursesProfiles(),
        lessons: this.loadCoursesLessons(),
      },
      Lesson: {
        __resolveReference: this.loadLessonsReferences(),
        course: this.loadLessonsCourse(),
        manager: this.loadLessonsManager(),
        resources: this.loadLessonsResources(),
      },
      CourseProfile: {
        __resolveReference: this.loadCourseProfilesReferences(),
        course: this.loadCourseProfilesCourse(),
        managedLessons: this.loadCourseProfilesManagedLessons(),
      },
      LessonResource: {
        __resolveReference: this.loadResourcesReferences(),
        lesson: this.loadResourcesLesson(),
      },
    };
  }

  private loadCoursesReferences() {
    return async (
      items: ILoader<ICourseReference>[],
      _: MercuriusContext,
    ): Promise<CourseEntity[]> => {
      return this.loadReferences(items, CourseEntity);
    };
  }

  private loadCoursesProfiles() {
    return async (
      items: ILoader<CourseEntity, FilterRelationDto>[],
      _: MercuriusContext,
    ): Promise<IPaginated<CourseProfileEntity>[]> => {
      return this.basicPaginator(
        items,
        CourseEntity,
        CourseProfileEntity,
        'profiles',
        'course',
        'slug',
      );
    };
  }

  private loadCoursesLessons() {
    return async (
      items: ILoader<CourseEntity, FilterRelationDto>[],
      _: MercuriusContext,
    ): Promise<IPaginated<LessonEntity>[]> => {
      return this.basicPaginator(
        items,
        CourseEntity,
        LessonEntity,
        'lessons',
        'course',
        'id',
      );
    };
  }

  private loadLessonsReferences() {
    return async (
      items: ILoader<ILessonReference>[],
      _: MercuriusContext,
    ): Promise<LessonEntity[]> => {
      return this.loadReferences(items, LessonEntity);
    };
  }

  private loadLessonsCourse() {
    return async (
      items: ILoader<LessonEntity>[],
      _: MercuriusContext,
    ): Promise<CourseEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'course');
      const courses = await this.em.find(CourseEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(courses);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadLessonsManager() {
    return async (
      items: ILoader<LessonEntity>[],
      _: MercuriusContext,
    ): Promise<CourseProfileEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'manager');
      const courses = await this.em.find(CourseProfileEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(courses);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadLessonsResources() {
    return async (
      items: ILoader<LessonEntity>[],
      _: MercuriusContext,
    ): Promise<ResourceEntity[][]> => {
      if (items.length === 0) return [];

      const lessons = LoadersService.getEntities(items);
      await this.em.populate(lessons, ['resources']);
      return lessons.map((lesson) => lesson.resources.getItems());
    };
  }

  private loadCourseProfilesReferences() {
    return async (
      items: ILoader<ICourseProfileReference>[],
      _: MercuriusContext,
    ): Promise<CourseProfileEntity[]> => {
      return this.loadReferences(items, CourseProfileEntity);
    };
  }

  private loadCourseProfilesCourse() {
    return async (
      items: ILoader<CourseProfileEntity>[],
      _: MercuriusContext,
    ): Promise<CourseEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'course');
      const courses = await this.em.find(CourseEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(courses);
      return LoadersService.getResults(ids, map);
    };
  }

  private loadCourseProfilesManagedLessons() {
    return async (
      items: ILoader<CourseProfileEntity, FilterRelationDto>[],
      _: MercuriusContext,
    ): Promise<IPaginated<LessonEntity>[]> => {
      return this.basicPaginator(
        items,
        CourseProfileEntity,
        LessonEntity,
        'managedLessons',
        'manager',
        'id',
      );
    };
  }

  private loadResourcesReferences() {
    return async (
      items: ILoader<IResourcesReference>[],
      _: MercuriusContext,
    ): Promise<ResourceEntity[]> => {
      return this.loadReferences(items, ResourceEntity);
    };
  }

  private loadResourcesLesson() {
    return async (
      items: ILoader<ResourceEntity>[],
      _: MercuriusContext,
    ): Promise<LessonEntity[]> => {
      if (items.length === 0) return [];
      const ids = LoadersService.getRelationIds(items, 'lesson');
      const lessons = await this.em.find(LessonEntity, {
        id: {
          $in: ids,
        },
      });
      const map = LoadersService.getEntityMap(lessons);
      return LoadersService.getResults(ids, map);
    };
  }

  private async loadReferences<T extends IReference, E extends IBase>(
    items: ILoader<T>[],
    entity: Type<E>,
  ): Promise<E[]> {
    const len = items.length;

    if (len === 0) return [];
    if (len === 1) {
      return [
        await this.em.findOne(entity, {
          id: parseInt(items[0].obj.id, 10),
        }),
      ];
    }

    const ids = LoadersService.getEntityIds(items);
    const entities = await this.em.find(entity, {
      id: {
        $in: ids,
      },
    });
    const map = LoadersService.getEntityMap(entities);
    return LoadersService.getResults(ids, map);
  }

  /**
   * Basic Paginator
   *
   * Loads paginated one-to-many relationships
   */
  private async basicPaginator<T extends IBase, C extends IBase>(
    data: ILoader<T, FilterRelationDto>[],
    parent: Type<T>,
    child: Type<C>,
    parentRelation: keyof T,
    childRelation: keyof C,
    cursor: keyof C,
  ): Promise<IPaginated<C>[]> {
    if (data.length === 0) return [];

    const { first, order } = data[0].params;
    const parentId = 'p.id';
    const childAlias = 'c';
    const childId = 'c.id';
    const knex = this.em.getKnex();
    const parentRef = knex.ref(parentId);
    const parentRel = String(parentRelation);
    const ids = LoadersService.getEntityIds(data);

    const countQuery = this.em
      .createQueryBuilder(child, childAlias)
      .count(childId)
      .where({
        [childRelation]: parentRef,
      })
      .as('count');
    const entitiesQuery = this.em
      .createQueryBuilder(child, childAlias)
      .select(`${childAlias}.id`)
      .where({
        [childRelation]: {
          id: parentRef,
        },
      })
      .orderBy({ [cursor]: order })
      .limit(first)
      .getKnexQuery();
    const results = await this.em
      .createQueryBuilder(parent, 'p')
      .select([parentId, countQuery])
      .leftJoinAndSelect(`p.${parentRel}`, childAlias)
      .groupBy([parentId, childId])
      .where({
        id: { $in: ids },
        [parentRelation]: { $in: entitiesQuery },
      })
      .orderBy({ [parentRelation]: { [cursor]: order } })
      .getResult();
    const map = new Map<number, IPaginated<C>>();

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      map.set(
        result.id,
        this.commonService.paginate(
          result[parentRelation].getItems(),
          result.count,
          0,
          cursor,
          first,
        ),
      );
    }

    return LoadersService.getResults(
      ids,
      map,
      this.commonService.paginate([], 0, 0, cursor, first),
    );
  }
}
