import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import AltairFastify, {
  AltairFastifyPluginOptions,
} from 'altair-fastify-plugin';
import { GraphQLError } from 'graphql';
import { MercuriusExtendedDriverConfig } from '../common/interfaces';
import { LoadersService } from '../loaders/loaders.service';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private readonly testing = this.configService.get<boolean>('testing');

  constructor(
    private readonly configService: ConfigService,
    private readonly loadersService: LoadersService,
  ) {}

  public createGqlOptions(): MercuriusExtendedDriverConfig {
    return {
      graphiql: false,
      ide: false,
      path: '/api/graphql',
      routes: true,
      autoSchemaFile: true,
      federationMetadata: true,
      errorFormatter: (error) => {
        const org = error.errors[0].originalError as HttpException;
        return {
          statusCode: org.getStatus(),
          response: {
            errors: [org.getResponse() as GraphQLError],
            data: null,
          },
        };
      },
      loaders: this.loadersService.getLoaders(),
      plugins: this.testing
        ? [
            {
              plugin: AltairFastify,
              options: {
                path: '/altair',
                baseURL: '/altair/',
                endpointURL: '/api/graphql',
              } as AltairFastifyPluginOptions,
            },
          ]
        : undefined,
    };
  }
}
