import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import AltairFastify, {
  AltairFastifyPluginOptions,
} from 'altair-fastify-plugin';
import {
  MercuriusDriverPlugin,
  MercuriusExtendedDriverConfig,
} from '@app/common/interfaces';
import mercuriusCache, { MercuriusCacheOptions } from 'mercurius-cache';
import Redis, { RedisOptions } from 'ioredis';
import { MercuriusGatewayService } from 'mercurius';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private readonly testing = this.configService.get<boolean>('testing');

  constructor(private readonly configService: ConfigService) {}

  public createGqlOptions(): MercuriusExtendedDriverConfig {
    const plugins: MercuriusDriverPlugin[] = [
      {
        plugin: mercuriusCache,
        options: {
          ttl: 60,
          all: true,
          storage: {
            type: 'redis',
            options: {
              client: new Redis(this.configService.get<RedisOptions>('redis')),
              size: 2048,
            },
          },
        } as MercuriusCacheOptions,
      },
    ];

    if (this.testing) {
      plugins.push({
        plugin: AltairFastify,
        options: {
          path: '/altair',
          baseURL: '/altair/',
          endpointURL: '/api/graphql',
        } as AltairFastifyPluginOptions,
      });
    }

    return {
      graphiql: false,
      ide: false,
      path: '/api/graphql',
      routes: true,
      gateway: {
        services: this.configService.get<MercuriusGatewayService[]>('services'),
      },
      plugins,
    };
  }
}
