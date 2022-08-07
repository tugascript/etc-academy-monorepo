/// <reference types="node" />
import { AbstractGraphQLDriver, GraphQLFederationFactory } from '@nestjs/graphql';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { MercuriusExtendedDriverConfig } from '../interfaces/mercurius-extended-driver-config.interface';
export declare class GraphQLFederationDriver extends AbstractGraphQLDriver<MercuriusExtendedDriverConfig> {
    private readonly graphqlFederationFactory;
    constructor(graphqlFederationFactory: GraphQLFederationFactory);
    get instance(): FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>;
    start(options: MercuriusExtendedDriverConfig): Promise<void>;
    stop(): Promise<void>;
}
