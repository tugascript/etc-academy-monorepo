"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const csrf_protection_1 = __importDefault(require("@fastify/csrf-protection"));
const mercurius_upload_1 = __importDefault(require("mercurius-upload"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const configService = app.get(config_1.ConfigService);
    const testing = configService.get('testing');
    app.register(cors_1.default, {
        credentials: true,
        origin: configService.get('url'),
    });
    app.register(cookie_1.default, {
        secret: configService.get('COOKIE_SECRET'),
    });
    app.register(csrf_protection_1.default, { cookieOpts: { signed: true } });
    app.register(mercurius_upload_1.default, configService.get('upload'));
    app.register(static_1.default, {
        root: (0, path_1.join)(__dirname, '..', 'public'),
        decorateReply: !testing,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.connectMicroservice({
        transport: microservices_1.Transport.REDIS,
        options: configService.get('redis'),
    });
    await app.startAllMicroservices();
    await app.listen(configService.get('port'), testing ? '127.0.0.1' : '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map