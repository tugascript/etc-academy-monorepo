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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesController = void 0;
const dtos_1 = require("../common/dtos");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const exception_filter_1 = require("../users/filters/exception.filter");
const user_profile_dto_1 = require("./dtos/user-profile.dto");
const user_profiles_dto_1 = require("./dtos/user-profiles.dto");
const profiles_service_1 = require("./profiles.service");
let ProfilesController = class ProfilesController {
    constructor(profilesService, configService) {
        this.profilesService = profilesService;
        this.configService = configService;
        this.authUUID = this.configService.get('AUTH_UUID');
        this.coursesUUID = this.configService.get('COURSES_UUID');
    }
    async getUserProfiles(dto) {
        if (dto.apiId !== this.authUUID)
            throw new microservices_1.RpcException('Unauthorized');
        const profiles = await this.profilesService.userProfiles(dto.userId);
        return new dtos_1.RedisMessageDto(this.transformProfiles(profiles));
    }
    async getProfileById(dto) {
        if (dto.apiId !== this.coursesUUID)
            throw new microservices_1.RpcException('Unauthorized');
        const profile = await this.profilesService.userProfileById(dto.profileId);
        return new dtos_1.RedisMessageDto(this.transformProfile(profile));
    }
    transformProfiles(profiles) {
        const accessProfiles = [];
        for (let i = 0; i < profiles.length; i++) {
            const profile = profiles[i];
            accessProfiles.push(this.transformProfile(profile));
        }
        return accessProfiles;
    }
    transformProfile(profile) {
        return {
            userName: profile.user.name,
            userId: profile.user.id,
            institutionId: profile.institution.id,
            profileId: profile.id,
            role: profile.role,
            status: profile.status,
        };
    }
};
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'USER_PROFILES' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_profiles_dto_1.UserProfilesDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getUserProfiles", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'USER_PROFILE_BY_ID' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_profile_dto_1.UserProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getProfileById", null);
ProfilesController = __decorate([
    (0, common_1.UseFilters)(new exception_filter_1.ExceptionFilter()),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService,
        config_1.ConfigService])
], ProfilesController);
exports.ProfilesController = ProfilesController;
//# sourceMappingURL=profiles.controller.js.map