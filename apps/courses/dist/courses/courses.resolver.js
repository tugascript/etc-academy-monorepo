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
exports.CoursesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../common/decorators");
const dtos_1 = require("../common/dtos");
const gql_1 = require("../common/entities/gql");
const institution_entity_1 = require("../external/entities/institution.entity");
const user_entity_1 = require("../external/entities/user.entity");
const paginated_lessons_type_1 = require("../lessons/entities/gql/paginated-lessons.type");
const paginated_course_profiles_type_1 = require("../profiles/entities/gql/paginated-course-profiles.type");
const courses_service_1 = require("./courses.service");
const course_dto_1 = require("./dtos/course.dto");
const filter_courses_dto_1 = require("./dtos/filter-courses.dto");
const update_course_description_dto_1 = require("./dtos/update-course-description.dto");
const update_course_name_dto_1 = require("./dtos/update-course-name.dto");
const update_course_picture_dto_1 = require("./dtos/update-course-picture.dto");
const update_course_type_dto_1 = require("./dtos/update-course-type.dto");
const course_entity_1 = require("./entities/course.entity");
const paginated_courses_type_1 = require("./entities/gql/paginated-courses.type");
const create_course_input_1 = require("./inputs/create-course.input");
let CoursesResolver = class CoursesResolver {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async createCourse(user, input) {
        return this.coursesService.createCourse(user, input);
    }
    async updateCourseName(user, dto) {
        return this.coursesService.updateCourseName(user, dto);
    }
    async updateCourseDescription(user, dto) {
        return this.coursesService.updateCourseDescription(user, dto);
    }
    async updateCoursePicture(user, dto) {
        return this.coursesService.updateCoursePicture(user, dto);
    }
    async updateCourseType(user, dto) {
        return this.coursesService.updateCourseType(user, dto);
    }
    async deleteCourse(user, dto) {
        return this.coursesService.deleteCourse(user.id, dto.courseId);
    }
    async courseById(user, dto) {
        return this.coursesService.courseById(user, dto.courseId);
    }
    async courseBySlug(user, dto) {
        return this.coursesService.courseBySlug(user, dto.slug);
    }
    async filterCourses(user, dto) {
        return this.coursesService.filterCourses(user, dto);
    }
    resolveReference(_) {
        return;
    }
    getAuthor(course) {
        return { __typename: 'User', id: course.authorId.toString() };
    }
    getInstitution(course) {
        return { __typename: 'Institution', id: course.institutionId.toString() };
    }
    async getProfiles(_) {
        return;
    }
    async getLessons(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => course_entity_1.CourseEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_course_input_1.CreateCourseInput]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "createCourse", null);
__decorate([
    (0, graphql_1.Mutation)(() => course_entity_1.CourseEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_course_name_dto_1.UpdateCourseNameDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "updateCourseName", null);
__decorate([
    (0, graphql_1.Mutation)(() => course_entity_1.CourseEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_course_description_dto_1.UpdateCourseDescriptionDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "updateCourseDescription", null);
__decorate([
    (0, graphql_1.Mutation)(() => course_entity_1.CourseEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_course_picture_dto_1.UpdateCoursePictureDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "updateCoursePicture", null);
__decorate([
    (0, graphql_1.Mutation)(() => course_entity_1.CourseEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_course_type_dto_1.UpdateCourseTypeDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "updateCourseType", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.CourseDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "deleteCourse", null);
__decorate([
    (0, graphql_1.Query)(() => course_entity_1.CourseEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_dto_1.CourseDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "courseById", null);
__decorate([
    (0, graphql_1.Query)(() => course_entity_1.CourseEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.SlugDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "courseBySlug", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_courses_type_1.PaginatedCoursesType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_courses_dto_1.FilterCoursesDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "filterCourses", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesResolver.prototype, "resolveReference", null);
__decorate([
    (0, graphql_1.ResolveField)('author', () => user_entity_1.UserEntity),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_entity_1.CourseEntity]),
    __metadata("design:returntype", Object)
], CoursesResolver.prototype, "getAuthor", null);
__decorate([
    (0, graphql_1.ResolveField)('institution', () => institution_entity_1.InstitutionEntity),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_entity_1.CourseEntity]),
    __metadata("design:returntype", Object)
], CoursesResolver.prototype, "getInstitution", null);
__decorate([
    (0, graphql_1.ResolveField)('profiles', () => paginated_course_profiles_type_1.PaginatedCourseProfilesType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.FilterRelationDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "getProfiles", null);
__decorate([
    (0, graphql_1.ResolveField)('lessons', () => paginated_lessons_type_1.PaginatedLessonsType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.FilterRelationDto]),
    __metadata("design:returntype", Promise)
], CoursesResolver.prototype, "getLessons", null);
CoursesResolver = __decorate([
    (0, graphql_1.Resolver)(() => course_entity_1.CourseEntity),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesResolver);
exports.CoursesResolver = CoursesResolver;
//# sourceMappingURL=courses.resolver.js.map