"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoadersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadersService = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const course_entity_1 = require("../courses/entities/course.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
const course_profile_entity_1 = require("../profiles/entities/course-profile.entity");
const resource_entity_1 = require("../resources/entities/resource.entity");
let LoadersService = LoadersService_1 = class LoadersService {
    constructor(em, commonService) {
        this.em = em;
        this.commonService = commonService;
    }
    static getEntities(items) {
        const entities = [];
        for (let i = 0; i < items.length; i++) {
            entities.push(items[i].obj);
        }
        return entities;
    }
    static getEntityIds(items) {
        const ids = [];
        for (let i = 0; i < items.length; i++) {
            const id = items[i].obj.id;
            ids.push(typeof id === 'string' ? parseInt(id, 10) : id);
        }
        return ids;
    }
    static getRelationIds(items, relationName) {
        const ids = [];
        for (let i = 0; i < items.length; i++) {
            ids.push(items[i].obj[relationName].id);
        }
        return ids;
    }
    static getEntityMap(entities) {
        const map = new Map();
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            map.set(entity.id, entity);
        }
        return map;
    }
    static getResults(ids, map, defaultValue = null) {
        var _a;
        const results = [];
        for (let i = 0; i < ids.length; i++) {
            results.push((_a = map.get(ids[i])) !== null && _a !== void 0 ? _a : defaultValue);
        }
        return results;
    }
    getLoaders() {
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
    loadCoursesReferences() {
        return async (items, _) => {
            return this.loadReferences(items, course_entity_1.CourseEntity);
        };
    }
    loadCoursesProfiles() {
        return async (items, _) => {
            return this.basicPaginator(items, course_entity_1.CourseEntity, course_profile_entity_1.CourseProfileEntity, 'profiles', 'course', 'slug');
        };
    }
    loadCoursesLessons() {
        return async (items, _) => {
            return this.basicPaginator(items, course_entity_1.CourseEntity, lesson_entity_1.LessonEntity, 'lessons', 'course', 'id');
        };
    }
    loadLessonsReferences() {
        return async (items, _) => {
            return this.loadReferences(items, lesson_entity_1.LessonEntity);
        };
    }
    loadLessonsCourse() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'course');
            const courses = await this.em.find(course_entity_1.CourseEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(courses);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadLessonsManager() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'manager');
            const courses = await this.em.find(course_profile_entity_1.CourseProfileEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(courses);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadLessonsResources() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const lessons = LoadersService_1.getEntities(items);
            await this.em.populate(lessons, ['resources']);
            return lessons.map((lesson) => lesson.resources.getItems());
        };
    }
    loadCourseProfilesReferences() {
        return async (items, _) => {
            return this.loadReferences(items, course_profile_entity_1.CourseProfileEntity);
        };
    }
    loadCourseProfilesCourse() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'course');
            const courses = await this.em.find(course_entity_1.CourseEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(courses);
            return LoadersService_1.getResults(ids, map);
        };
    }
    loadCourseProfilesManagedLessons() {
        return async (items, _) => {
            return this.basicPaginator(items, course_profile_entity_1.CourseProfileEntity, lesson_entity_1.LessonEntity, 'managedLessons', 'manager', 'id');
        };
    }
    loadResourcesReferences() {
        return async (items, _) => {
            return this.loadReferences(items, resource_entity_1.ResourceEntity);
        };
    }
    loadResourcesLesson() {
        return async (items, _) => {
            if (items.length === 0)
                return [];
            const ids = LoadersService_1.getRelationIds(items, 'lesson');
            const lessons = await this.em.find(lesson_entity_1.LessonEntity, {
                id: {
                    $in: ids,
                },
            });
            const map = LoadersService_1.getEntityMap(lessons);
            return LoadersService_1.getResults(ids, map);
        };
    }
    async loadReferences(items, entity) {
        const len = items.length;
        if (len === 0)
            return [];
        if (len === 1) {
            return [
                await this.em.findOne(entity, {
                    id: parseInt(items[0].obj.id, 10),
                }),
            ];
        }
        const ids = LoadersService_1.getEntityIds(items);
        const entities = await this.em.find(entity, {
            id: {
                $in: ids,
            },
        });
        const map = LoadersService_1.getEntityMap(entities);
        return LoadersService_1.getResults(ids, map);
    }
    async basicPaginator(data, parent, child, parentRelation, childRelation, cursor) {
        if (data.length === 0)
            return [];
        const { first, order } = data[0].params;
        const parentId = 'p.id';
        const childAlias = 'c';
        const childId = 'c.id';
        const knex = this.em.getKnex();
        const parentRef = knex.ref(parentId);
        const parentRel = String(parentRelation);
        const ids = LoadersService_1.getEntityIds(data);
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
        const map = new Map();
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            map.set(result.id, this.commonService.paginate(result[parentRelation].getItems(), result.count, 0, cursor, first));
        }
        return LoadersService_1.getResults(ids, map, this.commonService.paginate([], 0, 0, cursor, first));
    }
};
LoadersService = LoadersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        common_2.CommonService])
], LoadersService);
exports.LoadersService = LoadersService;
//# sourceMappingURL=loaders.service.js.map