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
const decorators_1 = require("../../common/decorators");
const graphql_1 = require("@nestjs/graphql");
const filter_profiles_dto_1 = require("../dtos/filter-profiles.dto");
const profile_relations_dto_1 = require("../dtos/profile-relations.dto");
const profile_slug_dto_1 = require("../dtos/profile-slug.dto");
const profile_dto_1 = require("../dtos/profile.dto");
const update_profile_picture_dto_1 = require("../dtos/update-profile-picture.dto");
const update_profile_role_dto_1 = require("../dtos/update-profile-role.dto");
const update_profile_status_dto_1 = require("../dtos/update-profile-status.dto");
const paginated_profiles_type_1 = require("../entities/gql/paginated-profiles.type");
const profile_entity_1 = require("../entities/profile.entity");
const profiles_service_1 = require("../profiles.service");
let ProfilesResolver = class ProfilesResolver {
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async updateProfilePicture(user, dto) {
        return this.profilesService.updateProfilePicture(user.id, dto);
    }
    async updateProfileStatus(user, dto) {
        return this.profilesService.updateProfileStatus(user.id, dto);
    }
    async updateProfileRole(user, dto) {
        return this.profilesService.updateProfileRole(user.id, dto);
    }
    async profileById(user, dto) {
        await this.profilesService.checkProfileExistence(user.id, dto.institutionId);
        return this.profilesService.profileById(dto.institutionId, dto.profileId);
    }
    async profileBySlug(user, dto) {
        await this.profilesService.checkProfileExistence(user.id, dto.institutionId);
        return this.profilesService.profileBySlug(dto.institutionId, dto.slug);
    }
    async profileByRelations(user, dto) {
        await this.profilesService.checkProfileExistence(user.id, dto.institutionId);
        return this.profilesService.profileByRelations(dto.userId, dto.institutionId);
    }
    async filterProfiles(user, dto) {
        return this.profilesService.filterProfiles(user.id, dto);
    }
    resolveReference(_) {
        return;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.ProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_picture_dto_1.UpdateProfilePictureDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "updateProfilePicture", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.ProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_status_dto_1.UpdateProfileStatusDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "updateProfileStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.ProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_role_dto_1.UpdateProfileRoleDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "updateProfileRole", null);
__decorate([
    (0, graphql_1.Query)(() => profile_entity_1.ProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.ProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "profileById", null);
__decorate([
    (0, graphql_1.Query)(() => profile_entity_1.ProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_slug_dto_1.ProfileSlugDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "profileBySlug", null);
__decorate([
    (0, graphql_1.Query)(() => profile_entity_1.ProfileEntity),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_relations_dto_1.ProfileRelationsDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "profileByRelations", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_profiles_type_1.PaginatedProfilesType),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_profiles_dto_1.FilterProfilesDto]),
    __metadata("design:returntype", Promise)
], ProfilesResolver.prototype, "filterProfiles", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfilesResolver.prototype, "resolveReference", null);
ProfilesResolver = __decorate([
    (0, graphql_1.Resolver)(() => profile_entity_1.ProfileEntity),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], ProfilesResolver);
exports.ProfilesResolver = ProfilesResolver;
//# sourceMappingURL=profiles.resolver.js.map