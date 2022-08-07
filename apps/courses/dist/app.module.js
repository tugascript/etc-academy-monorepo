"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const drivers_1 = require("./common/drivers");
const uploader_1 = require("./uploader");
const app_controller_1 = require("./app.controller");
const common_2 = require("./common");
const config_2 = require("./config/config");
const graphql_config_1 = require("./config/graphql.config");
const mikro_orm_config_1 = require("./config/mikro-orm.config");
const uploader_config_1 = require("./config/uploader.config");
const validation_1 = require("./config/validation");
const courses_module_1 = require("./courses/courses.module");
const institutions_resolver_1 = require("./external/institutions.resolver");
const users_resolver_1 = require("./external/users.resolver");
const lessons_module_1 = require("./lessons/lessons.module");
const loaders_module_1 = require("./loaders/loaders.module");
const profiles_module_1 = require("./profiles/profiles.module");
const resources_module_1 = require("./resources/resources.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: validation_1.validationSchema,
                load: [config_2.config],
            }),
            nestjs_1.MikroOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: mikro_orm_config_1.MikroOrmConfig,
            }),
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_1.ConfigModule, loaders_module_1.LoadersModule],
                driver: drivers_1.GraphQLFederationDriver,
                useClass: graphql_config_1.GraphQLConfig,
            }),
            uploader_1.UploaderModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: uploader_config_1.UploaderConfig,
            }),
            users_resolver_1.UsersResolver,
            institutions_resolver_1.InstitutionsResolver,
            common_2.CommonModule,
            courses_module_1.CoursesModule,
            lessons_module_1.LessonsModule,
            resources_module_1.ResourcesModule,
            loaders_module_1.LoadersModule,
            profiles_module_1.ProfilesModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map