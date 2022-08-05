import { IBucketOptions } from '@app/uploader/interfaces';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { UploadOptions } from 'graphql-upload';
import { RedisOptions } from 'ioredis';

export interface IConfig {
  port: number;
  db: MikroOrmModuleOptions;
  bucketConfig: IBucketOptions;
  redis: RedisOptions;
  upload: UploadOptions;
  testing: boolean;
}
