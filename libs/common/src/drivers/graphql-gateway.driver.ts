import { MercuriusGatewayDriver } from '@nestjs/mercurius';
import { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';
import { MercuriusExtendedDriverConfig } from '../interfaces/mercurius-extended-driver-config.interface';
import { registerMercuriusPlugins } from '../utils/register-mercurius-plugin.util';

export class GraphQLGatewayDriver extends MercuriusGatewayDriver {
  constructor() {
    super();
  }

  public async start(options: MercuriusExtendedDriverConfig) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const platformName = httpAdapter.getType();

    if (platformName !== 'fastify') {
      throw new Error(`No support for current HttpAdapter: ${platformName}`);
    }

    const app = httpAdapter.getInstance<FastifyInstance>();
    const plugins = options.plugins;
    delete options.plugins;
    await app.register(mercurius, {
      ...options,
    });
    await registerMercuriusPlugins(app, plugins);
  }
}
