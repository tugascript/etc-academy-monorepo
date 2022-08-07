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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const altair_fastify_plugin_1 = __importDefault(require("altair-fastify-plugin"));
const loaders_service_1 = require("../loaders/loaders.service");
let GqlConfigService = class GqlConfigService {
    constructor(configService, loadersService) {
        this.configService = configService;
        this.loadersService = loadersService;
        this.testing = this.configService.get('testing');
    }
    createGqlOptions() {
        return {
            graphiql: false,
            ide: false,
            path: '/api/graphql',
            routes: true,
            autoSchemaFile: true,
            federationMetadata: true,
            errorFormatter: (error) => {
                const org = error.errors[0].originalError;
                return {
                    statusCode: org.getStatus(),
                    response: {
                        errors: [org.getResponse()],
                        data: null,
                    },
                };
            },
            loaders: this.loadersService.getLoaders(),
            plugins: this.testing
                ? [
                    {
                        plugin: altair_fastify_plugin_1.default,
                        options: {
                            path: '/altair',
                            baseURL: '/altair/',
                            endpointURL: '/api/graphql',
                        },
                    },
                ]
                : undefined,
        };
    }
};
GqlConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        loaders_service_1.LoadersService])
], GqlConfigService);
exports.GqlConfigService = GqlConfigService;
//# sourceMappingURL=graphql.config.js.map