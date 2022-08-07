"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const config_1 = require("@nestjs/config");
const validation_1 = require("./config/validation");
const config_2 = require("./config/config");
const cache_config_1 = require("./config/cache.config");
const auth_module_1 = require("./auth/auth.module");
const email_module_1 = require("./email/email.module");
const core_1 = require("@nestjs/core");
const common_2 = require("./common");
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
            common_1.CacheModule.registerAsync({
                isGlobal: true,
                imports: [config_1.ConfigModule],
                useClass: cache_config_1.CacheConfig,
            }),
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: common_2.AuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map