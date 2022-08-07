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
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const user_client_config_1 = require("../config/user-client.config");
const courses_module_1 = require("../courses/courses.module");
const course_profile_entity_1 = require("./entities/course-profile.entity");
const profiles_resolver_1 = require("./profiles.resolver");
const profiles_service_1 = require("./profiles.service");
let ProfilesModule = class ProfilesModule {
};
ProfilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature([course_profile_entity_1.CourseProfileEntity]),
            microservices_1.ClientsModule.registerAsync([
                {
                    imports: [config_1.ConfigModule],
                    name: 'USER_SERVICE',
                    useClass: user_client_config_1.UserClientConfig,
                },
            ]),
            (0, common_1.forwardRef)(() => courses_module_1.CoursesModule),
        ],
        providers: [profiles_resolver_1.ProfilesResolver, profiles_service_1.ProfilesService],
        exports: [profiles_service_1.ProfilesService],
    })
], ProfilesModule);
exports.ProfilesModule = ProfilesModule;
//# sourceMappingURL=profiles.module.js.map