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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const enums_1 = require("../common/enums");
const profiles_service_1 = require("../profiles/profiles.service");
const lesson_entity_1 = require("./entities/lesson.entity");
const lesson_type_enum_1 = require("./enums/lesson-type.enum");
let LessonsService = class LessonsService {
    constructor(lessonsRepository, profilesService, commonService) {
        this.lessonsRepository = lessonsRepository;
        this.profilesService = profilesService;
        this.commonService = commonService;
    }
    async createLesson(userId, { courseId, lessonType, title, time, link }) {
        const profile = await this.checkProfile(userId, courseId);
        const lessonTime = new Date(time);
        if (lessonTime.getTime() - Date.now() < 0)
            throw new common_1.BadRequestException('Lesson time must be in future');
        const lesson = this.lessonsRepository.create({
            title: this.commonService.formatTitle(title),
            time: lessonTime,
            num: (await this.lessonsRepository.count({ course: courseId })) + 1,
            lessonType,
            manager: profile.id,
        });
        if (lessonType === lesson_type_enum_1.LessonTypeEnum.ONLINE && link)
            lesson.link = link;
        await this.commonService.saveEntity(this.lessonsRepository, lesson, true);
        return lesson;
    }
    async updateLessonTime(userId, { courseId, lessonId, time }) {
        await this.checkProfile(userId, courseId);
        const lesson = await this.getLessonById(courseId, lessonId);
        this.checkLessonForUpdate(lesson);
        const lessonTime = new Date(time);
        if (lessonTime.getTime() - Date.now() < 0)
            throw new common_1.BadRequestException('Lesson time must be in future');
        lesson.time = lessonTime;
        await this.commonService.saveEntity(this.lessonsRepository, lesson);
        return lesson;
    }
    async updateLessonTitle(userId, { courseId, lessonId, title }) {
        await this.checkProfile(userId, courseId);
        const lesson = await this.getLessonById(courseId, lessonId);
        lesson.title = this.commonService.formatTitle(title);
        await this.commonService.saveEntity(this.lessonsRepository, lesson);
        return lesson;
    }
    async updateLessonType(userId, { courseId, lessonId, lessonType, link }) {
        await this.checkProfile(userId, courseId);
        const lesson = await this.getLessonById(courseId, lessonId);
        this.checkLessonForUpdate(lesson);
        lesson.lessonType = lessonType;
        if (lessonType === lesson_type_enum_1.LessonTypeEnum.ONLINE) {
            if (link)
                lesson.link = link;
        }
        else {
            lesson.link = null;
        }
        return lesson;
    }
    async updateLessonLink(userId, { courseId, lessonId, link }) {
        await this.checkProfile(userId, courseId);
        const lesson = await this.getLessonById(courseId, lessonId);
        this.checkLessonForUpdate(lesson);
        if (lesson.lessonType !== lesson_type_enum_1.LessonTypeEnum.ONLINE)
            throw new common_1.BadRequestException('You can not add a link to an in-person lesson');
        lesson.link = link;
        return lesson;
    }
    async deleteLesson(userId, { courseId, lessonId }) {
        await this.checkProfile(userId, courseId);
        const lesson = await this.getLessonById(courseId, lessonId);
        this.checkLessonForUpdate(lesson);
        await this.commonService.removeEntity(this.lessonsRepository, lesson);
        return new gql_1.LocalMessageType('Lesson deleted successfully');
    }
    async lessonById(userId, { lessonId, courseId }) {
        await this.profilesService.checkProfileExistence(userId, courseId);
        return this.getLessonById(courseId, lessonId);
    }
    async filterLessons(userId, { courseId, order, first, after }) {
        await this.profilesService.checkProfileExistence(userId, courseId);
        const qb = this.lessonsRepository
            .createQueryBuilder('l')
            .where({ course: courseId });
        return this.commonService.queryBuilderPagination('l', 'id', first, order, qb, after, true);
    }
    async lessonByIdWithManager(lessonId) {
        const lesson = await this.lessonsRepository.findOne({
            id: lessonId,
        }, { populate: ['manager'] });
        this.commonService.checkExistence('Lesson', lesson);
        return lesson;
    }
    async getLessonById(courseId, lessonId) {
        const lesson = await this.lessonsRepository.findOne({
            course: courseId,
            id: lessonId,
        });
        this.commonService.checkExistence('Lesson', lesson);
        return lesson;
    }
    async checkProfile(userId, courseId) {
        const profile = await this.profilesService.profileByUserId(userId, courseId);
        if (profile.role !== enums_1.ProfileRoleEnum.ADMIN &&
            profile.role !== enums_1.ProfileRoleEnum.TEACHER)
            throw new common_1.UnauthorizedException('You are not authorized to edit lessons');
        return profile;
    }
    checkLessonForUpdate(lesson) {
        if (lesson.time.getTime() - Date.now() < 0)
            throw new common_1.BadRequestException('You can not update a past lesson');
    }
};
LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(lesson_entity_1.LessonEntity)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        profiles_service_1.ProfilesService,
        common_2.CommonService])
], LessonsService);
exports.LessonsService = LessonsService;
//# sourceMappingURL=lessons.service.js.map