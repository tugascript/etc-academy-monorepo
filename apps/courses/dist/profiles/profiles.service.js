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
exports.ProfilesService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const enums_1 = require("../common/enums");
const courses_service_1 = require("../courses/courses.service");
const course_profile_entity_1 = require("./entities/course-profile.entity");
let ProfilesService = class ProfilesService {
    constructor(profilesRepository, commonService, configService, coursesService, usersClient) {
        this.profilesRepository = profilesRepository;
        this.commonService = commonService;
        this.configService = configService;
        this.coursesService = coursesService;
        this.usersClient = usersClient;
        this.coursesNamespace = this.configService.get('COURSES_UUID');
    }
    async createInitialProfile(user, institutionId, courseId) {
        const profile = this.profilesRepository.create({
            slug: this.commonService.generateSlug(user.name),
            course: courseId,
            role: enums_1.ProfileRoleEnum.ADMIN,
            status: enums_1.ProfileStatusEnum.STAFF,
            userId: user.id,
            institutionProfileId: user.roles[institutionId].id,
            institutionId: institutionId,
        });
        await this.commonService.saveEntity(this.profilesRepository, profile, true);
        return profile;
    }
    async createProfile(user, { courseId, profileId, role, status }) {
        const course = await this.coursesService.courseById(user, courseId);
        const userRole = this.commonService.getUserRole(user, course.institutionId);
        switch (role) {
            case enums_1.ProfileRoleEnum.ADMIN:
            case enums_1.ProfileRoleEnum.STAFF:
            case enums_1.ProfileRoleEnum.TEACHER:
                if (userRole !== enums_1.ProfileRoleEnum.ADMIN)
                    throw new common_1.UnauthorizedException(`You do not have permission to create an ${role.toLowerCase()} profile`);
                if (status !== enums_1.ProfileStatusEnum.STAFF)
                    throw new common_1.BadRequestException('Only staff profiles can be created with that role');
                break;
            case enums_1.ProfileRoleEnum.STUDENT:
                if (userRole === enums_1.ProfileRoleEnum.STUDENT)
                    throw new common_1.UnauthorizedException('You cannot create a student profile');
                if (status === enums_1.ProfileStatusEnum.STAFF)
                    throw new common_1.BadRequestException('Staff profiles can not be created with that role');
                break;
        }
        const messageProfile = await this.getMessageProfile(profileId);
        if (messageProfile.institutionId !== course.institutionId)
            throw new common_1.UnauthorizedException('You do not have permission to create a profile for this institution');
        const profile = this.profilesRepository.create({
            slug: this.commonService.generateSlug(messageProfile.userName),
            course: courseId,
            role,
            status,
            userId: messageProfile.userId,
            institutionProfileId: messageProfile.profileId,
            institutionId: messageProfile.institutionId,
        });
        await this.commonService.saveEntity(this.profilesRepository, profile, true);
        return profile;
    }
    async updateProfileStatus(user, { courseId, profileId, status }) {
        const profile = await this.getProfileById(courseId, profileId);
        const role = this.commonService.getUserRole(user, profile.institutionId);
        if (role !== enums_1.ProfileRoleEnum.ADMIN && role !== enums_1.ProfileRoleEnum.STAFF)
            throw new common_1.UnauthorizedException('You do not have permission to update this profile');
        if (profile.role !== enums_1.ProfileRoleEnum.STUDENT)
            throw new common_1.BadRequestException('Only students can be updated');
        profile.status = status;
        await this.commonService.saveEntity(this.profilesRepository, profile);
        return profile;
    }
    async deleteProfile(user, { courseId, profileId }) {
        const profile = await this.getProfileById(courseId, profileId);
        const role = this.commonService.getUserRole(user, profile.institutionId);
        if (role !== enums_1.ProfileRoleEnum.ADMIN)
            throw new common_1.UnauthorizedException('You do not have permission to delete this profile');
        await this.commonService.removeEntity(this.profilesRepository, profile);
        return new gql_1.LocalMessageType('Profile deleted successfully');
    }
    async profileById(user, { courseId, profileId }) {
        const profile = await this.getProfileById(courseId, profileId);
        this.commonService.getUserRole(user, profile.institutionId);
        return profile;
    }
    async profileBySlug(user, { courseId, slug }) {
        const profile = await this.profilesRepository.findOne({
            slug,
            course: courseId,
        });
        this.commonService.checkExistence('Course Profile', profile);
        this.commonService.getUserRole(user, profile.institutionId);
        return profile;
    }
    async filterProfiles(user, { courseId, order, first, after }) {
        const course = await this.coursesService.courseById(user, courseId);
        const qb = this.profilesRepository
            .createQueryBuilder('cp')
            .where({ course });
        return this.commonService.queryBuilderPagination('cp', 'slug', first, order, qb, after);
    }
    async profileByUserId(userId, courseId) {
        const profile = await this.profilesRepository.findOne({
            userId,
            course: courseId,
        });
        this.commonService.checkExistence('Course Profile', profile);
        return profile;
    }
    async checkProfileExistence(userId, courseId) {
        const count = await this.profilesRepository.count({
            userId,
            course: courseId,
        });
        if (count === 0)
            throw new common_1.UnauthorizedException('You are not a member of this course');
    }
    async getProfileById(courseId, profileId) {
        const profile = await this.profilesRepository.findOne({
            course: courseId,
            id: profileId,
        });
        this.commonService.checkExistence('Course Profile', profile);
        return profile;
    }
    async getMessageProfile(profileId) {
        const message = await this.commonService.throwInternalError((0, rxjs_1.firstValueFrom)(this.usersClient
            .send({ cmd: 'USER_PROFILE_BY_ID' }, {
            apiId: this.coursesNamespace,
            profileId,
        })
            .pipe((0, rxjs_1.timeout)(2000))));
        if (message.status === 'error')
            throw new common_1.BadRequestException(message.message);
        return message.message;
    }
};
ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(course_profile_entity_1.CourseProfileEntity)),
    __param(4, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        common_2.CommonService,
        config_1.ConfigService,
        courses_service_1.CoursesService,
        microservices_1.ClientProxy])
], ProfilesService);
exports.ProfilesService = ProfilesService;
//# sourceMappingURL=profiles.service.js.map