"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMercuriusFederatedSchema = void 0;
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const lodash_1 = require("lodash");
function buildMercuriusFederatedSchema({ typeDefs, resolvers, }) {
    const { buildSubgraphSchema, printSubgraphSchema } = (0, load_package_util_1.loadPackage)('@apollo/subgraph', 'MercuriusFederation', () => require('@apollo/subgraph'));
    let executableSchema = buildSubgraphSchema({
        typeDefs,
        resolvers,
    });
    const subscriptionResolvers = resolvers.Subscription;
    executableSchema = (0, graphql_1.transformSchema)(executableSchema, (type) => {
        if ((0, graphql_2.isObjectType)(type)) {
            const isSubscription = type.name === 'Subscription';
            (0, lodash_1.forEach)(type.getFields(), (value, key) => {
                if (isSubscription && subscriptionResolvers) {
                    const resolver = subscriptionResolvers[key];
                    if (resolver && !value.subscribe) {
                        value.subscribe = resolver.subscribe;
                    }
                }
                else if (key === '_service') {
                    value.resolve = function resolve() {
                        return {
                            sdl: printSubgraphSchema((0, graphql_2.buildASTSchema)(typeDefs, {
                                assumeValid: true,
                            }))
                                .replace('type Query {', 'type Query @extends {')
                                .replace('type Mutation {', 'type Mutation @extends {')
                                .replace('type Subscription {', 'type Subscription @extends {'),
                        };
                    };
                }
            });
        }
        return type;
    });
    return executableSchema;
}
exports.buildMercuriusFederatedSchema = buildMercuriusFederatedSchema;
//# sourceMappingURL=build-mercurius-federated-schema.util.js.map