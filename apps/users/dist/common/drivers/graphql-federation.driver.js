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
exports.GraphQLFederationDriver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const mercurius_1 = __importDefault(require("mercurius"));
const build_mercurius_federated_schema_util_1 = require("../utils/build-mercurius-federated-schema.util");
const register_mercurius_plugin_util_1 = require("../utils/register-mercurius-plugin.util");
let GraphQLFederationDriver = class GraphQLFederationDriver extends graphql_1.AbstractGraphQLDriver {
    constructor(graphqlFederationFactory) {
        super();
        this.graphqlFederationFactory = graphqlFederationFactory;
    }
    get instance() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.httpAdapterHost) === null || _a === void 0 ? void 0 : _a.httpAdapter) === null || _b === void 0 ? void 0 : _b.getInstance) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    async start(options) {
        const plugins = options.plugins;
        delete options.plugins;
        const adapterOptions = await this.graphqlFederationFactory.mergeWithSchema(options, build_mercurius_federated_schema_util_1.buildMercuriusFederatedSchema);
        if (adapterOptions.definitions && adapterOptions.definitions.path) {
            await this.graphQlFactory.generateDefinitions((0, graphql_2.printSchema)(adapterOptions.schema), adapterOptions);
        }
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const platformName = httpAdapter.getType();
        if (platformName !== 'fastify') {
            throw new Error(`No support for current HttpAdapter: ${platformName}`);
        }
        const app = httpAdapter.getInstance();
        await app.register(mercurius_1.default, Object.assign({}, adapterOptions));
        await (0, register_mercurius_plugin_util_1.registerMercuriusPlugins)(app, plugins);
    }
    async stop() { }
};
GraphQLFederationDriver = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [graphql_1.GraphQLFederationFactory])
], GraphQLFederationDriver);
exports.GraphQLFederationDriver = GraphQLFederationDriver;
//# sourceMappingURL=graphql-federation.driver.js.map