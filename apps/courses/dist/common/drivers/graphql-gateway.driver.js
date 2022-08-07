"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLGatewayDriver = void 0;
const mercurius_1 = require("@nestjs/mercurius");
const mercurius_2 = __importDefault(require("mercurius"));
const register_mercurius_plugin_util_1 = require("../utils/register-mercurius-plugin.util");
class GraphQLGatewayDriver extends mercurius_1.MercuriusGatewayDriver {
    constructor() {
        super();
    }
    async start(options) {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const platformName = httpAdapter.getType();
        if (platformName !== 'fastify') {
            throw new Error(`No support for current HttpAdapter: ${platformName}`);
        }
        const app = httpAdapter.getInstance();
        const plugins = options.plugins;
        delete options.plugins;
        await app.register(mercurius_2.default, Object.assign({}, options));
        await (0, register_mercurius_plugin_util_1.registerMercuriusPlugins)(app, plugins);
    }
}
exports.GraphQLGatewayDriver = GraphQLGatewayDriver;
//# sourceMappingURL=graphql-gateway.driver.js.map