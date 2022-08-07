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
exports.LessonsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../common/decorators");
const gql_1 = require("../common/entities/gql");
const resource_entity_1 = require("../resources/entities/resource.entity");
const filter_lessons_dto_1 = require("./dtos/filter-lessons.dto");
const lesson_dto_1 = require("./dtos/lesson.dto");
const update_lesson_link_dto_1 = require("./dtos/update-lesson-link.dto");
const update_lesson_time_dto_1 = require("./dtos/update-lesson-time.dto");
const update_lesson_title_dto_1 = require("./dtos/update-lesson-title.dto");
const update_lesson_type_dto_1 = require("./dtos/update-lesson-type.dto");
const paginated_lessons_type_1 = require("./entities/gql/paginated-lessons.type");
const lesson_entity_1 = require("./entities/lesson.entity");
const create_lesson_input_1 = require("./inputs/create-lesson.input");
const lessons_service_1 = require("./lessons.service");
let LessonsResolver = class LessonsResolver {
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    async createLesson(user, input) {
        return this.lessonsService.createLesson(user.id, input);
    }
    async updateLessonLink(user, dto) {
        return this.lessonsService.updateLessonLink(user.id, dto);
    }
    async updateLessonTime(user, dto) {
        return this.lessonsService.updateLessonTime(user.id, dto);
    }
    async updateLessonTitle(user, dto) {
        return this.lessonsService.updateLessonTitle(user.id, dto);
    }
    async updateLessonType(user, dto) {
        return this.lessonsService.updateLessonType(user.id, dto);
    }
    async deleteLesson(user, dto) {
        return this.lessonsService.deleteLesson(user.id, dto);
    }
    async lessonById(user, dto) {
        return this.lessonsService.lessonById(user.id, dto);
    }
    async filterLessons(user, dto) {
        return this.lessonsService.filterLessons(user.id, dto);
    }
    resolveReference(_) {
        return;
    }
    async getResources() {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => lesson_entity_1.LessonEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lesson_input_1.CreateLessonInput]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "createLesson", null);
__decorate([
    (0, graphql_1.Mutation)(() => lesson_entity_1.LessonEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_lesson_link_dto_1.UpdateLessonLinkDto]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "updateLessonLink", null);
__decorate([
    (0, graphql_1.Mutation)(() => lesson_entity_1.LessonEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_lesson_time_dto_1.UpdateLessonTimeDto]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "updateLessonTime", null);
__decorate([
    (0, graphql_1.Mutation)(() => lesson_entity_1.LessonEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_lesson_title_dto_1.UpdateLessonTitleDto]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "updateLessonTitle", null);
__decorate([
    (0, graphql_1.Mutation)(() => lesson_entity_1.LessonEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_lesson_type_dto_1.UpdateLessonTypeDto]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "updateLessonType", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_dto_1.LessonDto]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "deleteLesson", null);
__decorate([
    (0, graphql_1.Query)(() => lesson_entity_1.LessonEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_dto_1.LessonDto]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "lessonById", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_lessons_type_1.PaginatedLessonsType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_lessons_dto_1.FilterLessonsDto]),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "filterLessons", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsResolver.prototype, "resolveReference", null);
__decorate([
    (0, graphql_1.ResolveField)('resources', () => [resource_entity_1.ResourceEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonsResolver.prototype, "getResources", null);
LessonsResolver = __decorate([
    (0, graphql_1.Resolver)(() => lesson_entity_1.LessonEntity),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsResolver);
exports.LessonsResolver = LessonsResolver;
//# sourceMappingURL=lessons.resolver.js.map