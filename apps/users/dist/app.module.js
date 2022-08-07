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
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const common_2 = require("./common");
const drivers_1 = require("./common/drivers");
const uploader_1 = require("./uploader");
const addresses_module_1 = require("./addresses/addresses.module");
const app_controller_1 = require("./app.controller");
const config_2 = require("./config/config");
const graphql_config_1 = require("./config/graphql.config");
const mikroorm_config_1 = require("./config/mikroorm.config");
const uploader_config_1 = require("./config/uploader.config");
const validation_1 = require("./config/validation");
const email_module_1 = require("./email/email.module");
const institutions_module_1 = require("./institutions/institutions.module");
const loaders_module_1 = require("./loaders/loaders.module");
const profiles_module_1 = require("./profiles/profiles.module");
const users_module_1 = require("./users/users.module");
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
                useClass: mikroorm_config_1.MikroOrmConfig,
            }),
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_1.ConfigModule, loaders_module_1.LoadersModule],
                driver: drivers_1.GraphQLFederationDriver,
                useClass: graphql_config_1.GqlConfigService,
            }),
            uploader_1.UploaderModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: uploader_config_1.UploaderConfig,
            }),
            users_module_1.UsersModule,
            common_2.CommonModule,
            loaders_module_1.LoadersModule,
            institutions_module_1.InstitutionsModule,
            addresses_module_1.AddressesModule,
            profiles_module_1.ProfilesModule,
            email_module_1.EmailModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: common_2.AuthGuard,
            },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map