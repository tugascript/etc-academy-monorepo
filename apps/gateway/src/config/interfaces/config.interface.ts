import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { RedisOptions } from 'ioredis';
import { MercuriusGatewayService } from 'mercurius';
import { UploadOptions } from 'graphql-upload';

export interface IConfig {
  port: number;
  db: MikroOrmModuleOptions;
  redis: RedisOptions;
  testing: boolean;
  services: MercuriusGatewayService[];
  upload: UploadOptions;
}
