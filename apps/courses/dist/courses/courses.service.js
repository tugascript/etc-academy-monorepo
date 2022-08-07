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
exports.CoursesService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const enums_1 = require("../common/enums");
const uploader_1 = require("../uploader");
const course_entity_1 = require("./entities/course.entity");
let CoursesService = class CoursesService {
    constructor(coursesRepository, commonService, uploaderService) {
        this.coursesRepository = coursesRepository;
        this.commonService = commonService;
        this.uploaderService = uploaderService;
    }
    async createCourse(user, { institutionId, name, courseType, description, picture, }) {
        const role = this.commonService.getUserRole(user, institutionId);
        if (role !== enums_1.ProfileRoleEnum.ADMIN)
            throw new common_1.UnauthorizedException('Only admin can create courses');
        name = this.commonService.formatTitle(name);
        await this.checkCourseExistence(name, institutionId);
        const slug = this.commonService.generateSlug(name);
        const course = this.coursesRepository.create({
            institutionId,
            name,
            slug,
            courseType,
            description,
            authorId: user.id,
        });
        if (picture) {
            course.picture = await this.uploaderService.uploadImage(user.id, picture, enums_1.RatioEnum.BANNER);
        }
        await this.commonService.saveEntity(this.coursesRepository, course, true);
        return course;
    }
    async updateCourseName(user, { name, courseId }) {
        const course = await this.findCourseById(courseId);
        this.checkAdmin(user, course);
        name = this.commonService.formatTitle(name);
        await this.checkCourseExistence(name, courseId);
        const slug = this.commonService.generateSlug(name);
        course.name = name;
        course.slug = slug;
        await this.commonService.saveEntity(this.coursesRepository, course);
        return course;
    }
    async updateCourseDescription(user, { description, courseId }) {
        const course = await this.findCourseById(courseId);
        this.checkAdmin(user, course);
        course.description = description;
        await this.commonService.saveEntity(this.coursesRepository, course);
        return course;
    }
    async updateCoursePicture(user, { picture, courseId }) {
        const course = await this.findCourseById(courseId);
        this.checkAdmin(user, course);
        const toDelete = course.picture;
        course.picture = await this.uploaderService.uploadImage(user.id, picture, enums_1.RatioEnum.BANNER);
        await this.commonService.saveEntity(this.coursesRepository, course);
        if (toDelete)
            this.uploaderService.deleteFile(toDelete);
        return course;
    }
    async updateCourseType(user, { courseType, courseId }) {
        const course = await this.findCourseById(courseId);
        this.checkAdmin(user, course);
        course.courseType = courseType;
        await this.commonService.saveEntity(this.coursesRepository, course);
        return course;
    }
    async deleteCourse(userId, courseId) {
        const course = await this.findCourseById(courseId);
        if (course.authorId !== userId)
            throw new common_1.UnauthorizedException('You can only delete your own courses');
        await this.commonService.removeEntity(this.coursesRepository, course);
        return new gql_1.LocalMessageType('Course deleted successfully');
    }
    async courseById(user, courseId) {
        const course = await this.findCourseById(courseId);
        this.commonService.getUserRole(user, course.institutionId);
        return course;
    }
    async courseBySlug(user, slug) {
        const course = await this.coursesRepository.findOne({ slug });
        this.commonService.checkExistence('Course', course);
        this.commonService.getUserRole(user, course.institutionId);
        return course;
    }
    async filterCourses(user, { institutionId, search, cursor, order, first, after }) {
        this.commonService.getUserRole(user, institutionId);
        const qb = this.coursesRepository
            .createQueryBuilder('c')
            .where({ institutionId });
        if (search) {
            search = this.commonService.formatSearch(search);
            qb.andWhere({
                $or: [
                    {
                        name: {
                            $iLike: search,
                        },
                    },
                    {
                        description: {
                            $iLike: search,
                        },
                    },
                ],
            });
        }
        return this.commonService.queryBuilderPagination('c', (0, enums_1.getQueryCursor)(cursor), first, order, qb, after, cursor === enums_1.QueryCursorEnum.DATE);
    }
    async findCourseById(courseId) {
        const course = this.coursesRepository.findOne({ id: courseId });
        this.commonService.checkExistence('Course', course);
        return course;
    }
    checkAdmin(user, course) {
        if (course.authorId !== user.id) {
            const role = this.commonService.getUserRole(user, course.institutionId);
            if (role !== enums_1.ProfileRoleEnum.ADMIN)
                throw new common_1.UnauthorizedException('Only admin can update courses');
        }
    }
    async checkCourseExistence(name, institutionId) {
        const count = await this.coursesRepository.count({
            name,
            institutionId,
        });
        if (count > 0)
            throw new common_1.ConflictException('Course already exists');
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(course_entity_1.CourseEntity)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        common_2.CommonService,
        uploader_1.UploaderService])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map