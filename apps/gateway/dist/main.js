"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const graphql_upload_1 = require("graphql-upload");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({ credentials: true });
    app.use((0, cookie_parser_1.default)());
    app.use((0, graphql_upload_1.graphqlUploadExpress)(configService.get('upload')));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(configService.get('port'));
}
bootstrap();
//# sourceMappingURL=main.js.map