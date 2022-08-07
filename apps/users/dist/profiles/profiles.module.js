"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const email_module_1 = require("../email/email.module");
const users_module_1 = require("../users/users.module");
const invitation_entity_1 = require("./entities/invitation.entity");
const profile_request_entity_1 = require("./entities/profile-request.entity");
const profile_entity_1 = require("./entities/profile.entity");
const profiles_service_1 = require("./profiles.service");
const invitations_resolver_1 = require("./resolvers/invitations.resolver");
const profile_requests_resolver_1 = require("./resolvers/profile-requests.resolver");
const profiles_resolver_1 = require("./resolvers/profiles.resolver");
const profiles_controller_1 = require("./profiles.controller");
let ProfilesModule = class ProfilesModule {
};
ProfilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature([
                profile_entity_1.ProfileEntity,
                invitation_entity_1.InvitationEntity,
                profile_request_entity_1.ProfileRequestEntity,
            ]),
            users_module_1.UsersModule,
            email_module_1.EmailModule,
        ],
        providers: [
            profiles_resolver_1.ProfilesResolver,
            profile_requests_resolver_1.ProfileRequestsResolver,
            invitations_resolver_1.InvitationsResolver,
            profiles_service_1.ProfilesService,
        ],
        exports: [profiles_service_1.ProfilesService],
        controllers: [profiles_controller_1.ProfilesController],
    })
], ProfilesModule);
exports.ProfilesModule = ProfilesModule;
//# sourceMappingURL=profiles.module.js.map