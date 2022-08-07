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
exports.ProfilesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../common/decorators");
const dtos_1 = require("../common/dtos");
const gql_1 = require("../common/entities/gql");
const institution_profile_entity_1 = require("../external/entities/institution-profile.entity");
const institution_entity_1 = require("../external/entities/institution.entity");
const user_entity_1 = require("../external/entities/user.entity");
const paginated_lessons_type_1 = require("../lessons/entities/gql/paginated-lessons.type");
const filter_profiles_dto_1 = require("./dtos/filter-profiles.dto");
const profile_slug_dto_1 = require("./dtos/profile-slug.dto");
const profile_dto_1 = require("./dtos/profile.dto");
const update_profile_status_dto_1 = require("./dtos/update-profile-status.dto");
const course_profile_entity_1 = require("./entities/course-profile.entity");
const paginated_course_profiles_type_1 = require("./entities/gql/paginated-course-profiles.type");
const create_profile_input_1 = require("./inputs/create-profile.input");
const profiles_service_1 = require("./profiles.service");
let ProfilesResolver = class ProfilesResolver {
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async createCourseProfile(user, input) {
        return this.profilesService.createProfile(user, input);
    }
    async updateCourseProfileStatus(user, dto) {
        return this.profilesService.updateProfileStatus(user, dto);
    }
    async deleteCourseProfile(user, dto) {
        return this.profilesService.deleteProfile(user, dto);
    }
    async courseProfileById(user, dto) {
        return this.profilesService.profileById(user, dto);
    }
    async courseProfileBySlug(user, dto) {
        return this.profilesService.profileBySlug(user, dto);
    }
    async filterCourseProfiles(user, dto) {
        return this.profilesService.filterProfiles(user, dto);
    }
    resolveReference(_) {
        return;
    }
    getInstitutionProfile(profile) {
        return {
            __typename: 'InstitutionProfile',
            id: profile.institutionProfileId.toString(),
        };
    }
    getAuthor(profile) {
        return { __typename: 'User', id: profile.userId.toString() };
    }
    getInstitution(profile) {
        return { __typename: 'Institution', id: profile.institutionId.toString() };
    }
    getManagedLessons(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => course_profile_entity_1.CourseProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_profile_input_1.CreateProfileInput]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "createCourseProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => course_profile_entity_1.CourseProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_status_dto_1.UpdateProfileStatusDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "updateCourseProfileStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => gql_1.LocalMessageType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.ProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "deleteCourseProfile", null);
__decorate([
    (0, graphql_1.Query)(() => course_profile_entity_1.CourseProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.ProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "courseProfileById", null);
__decorate([
    (0, graphql_1.Query)(() => course_profile_entity_1.CourseProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_slug_dto_1.ProfileSlugDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "courseProfileBySlug", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_course_profiles_type_1.PaginatedCourseProfilesType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_profiles_dto_1.FilterProfilesDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "filterCourseProfiles", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfilesResolver.prototype, "resolveReference", null);
__decorate([
    (0, graphql_1.ResolveField)('institutionProfile', () => institution_profile_entity_1.ProfileEntity),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_profile_entity_1.CourseProfileEntity]),
    __metadata("design:returntype", Object)
], ProfilesResolver.prototype, "getInstitutionProfile", null);
__decorate([
    (0, graphql_1.ResolveField)('user', () => user_entity_1.UserEntity),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_profile_entity_1.CourseProfileEntity]),
    __metadata("design:returntype", Object)
], ProfilesResolver.prototype, "getAuthor", null);
__decorate([
    (0, graphql_1.ResolveField)('institution', () => institution_entity_1.InstitutionEntity),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_profile_entity_1.CourseProfileEntity]),
    __metadata("design:returntype", Object)
], ProfilesResolver.prototype, "getInstitution", null);
__decorate([
    (0, graphql_1.ResolveField)('managedLessons', () => paginated_lessons_type_1.PaginatedLessonsType),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.FilterRelationDto]),
    __metadata("design:returntype", void 0)
], ProfilesResolver.prototype, "getManagedLessons", null);
ProfilesResolver = __decorate([
    (0, graphql_1.Resolver)(() => course_profile_entity_1.CourseProfileEntity),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], ProfilesResolver);
exports.ProfilesResolver = ProfilesResolver;
//# sourceMappingURL=profiles.resolver.js.map