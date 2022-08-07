import { BuildFederatedSchemaOptions } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
export declare function buildMercuriusFederatedSchema({ typeDefs, resolvers, }: BuildFederatedSchemaOptions): GraphQLSchema;
