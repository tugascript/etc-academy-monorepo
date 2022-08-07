"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const email_module_1 = require("../email/email.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const throttler_config_1 = require("../config/throttler.config");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("../common");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: throttler_config_1.ThrottlerConfig,
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    imports: [config_1.ConfigModule],
                    name: 'USER_SERVICE',
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.REDIS,
                        options: configService.get('redis'),
                    }),
                },
            ]),
            common_2.CommonModule,
            email_module_1.EmailModule,
        ],
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map