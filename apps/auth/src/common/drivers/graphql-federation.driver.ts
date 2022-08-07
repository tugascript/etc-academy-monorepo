import { Injectable } from '@nestjs/common';
import {
  AbstractGraphQLDriver,
  GraphQLFederationFactory,
} from '@nestjs/graphql';
import { FastifyInstance, FastifyLoggerInstance } from 'fastify';
import { printSchema } from 'graphql';
import { IncomingMessage, Server, ServerResponse } from 'http';
import mercurius from 'mercurius';
import { buildMercuriusFederatedSchema } from '../utils/build-mercurius-federated-schema.util';
import { MercuriusExtendedDriverConfig } from '../interfaces/mercurius-extended-driver-config.interface';
import { registerMercuriusPlugins } from '../utils/register-mercurius-plugin.util';

@Injectable()
export class GraphQLFederationDriver extends AbstractGraphQLDriver<MercuriusExtendedDriverConfig> {
  constructor(
    private readonly graphqlFederationFactory: GraphQLFederationFactory,
  ) {
    super();
  }

  get instance(): FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  > {
    return this.httpAdapterHost?.httpAdapter?.getInstance?.();
  }

  public async start(options: MercuriusExtendedDriverConfig) {
    const plugins = options.plugins;
    delete options.plugins;

    const adapterOptions = await this.graphqlFederationFactory.mergeWithSchema(
      options,
      buildMercuriusFederatedSchema,
    );

    if (adapterOptions.definitions && adapterOptions.definitions.path) {
      await this.graphQlFactory.generateDefinitions(
        printSchema(adapterOptions.schema),
        adapterOptions,
      );
    }

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const platformName = httpAdapter.getType();

    if (platformName !== 'fastify') {
      throw new Error(`No support for current HttpAdapter: ${platformName}`);
    }
    const app = httpAdapter.getInstance<FastifyInstance>();
    await app.register(mercurius, {
      ...adapterOptions,
    });
    await registerMercuriusPlugins(app, plugins);
  }

  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  public async stop(): Promise<void> {}
}
