import { LoadStrategy } from '@mikro-orm/core';
import { redisUrlToOptions } from '../common/utils';
import { IConfig } from './interfaces/config.interface';

export function config(): IConfig {
  const testing = process.env.NODE_ENV !== 'production';

  return {
    port: parseInt(process.env.PORT, 10),
    bucketConfig: {
      name: process.env.BUCKET_NAME,
      region: process.env.BUCKET_REGION,
      host: process.env.BUCKET_HOST,
      uuid: process.env.BUCKET_UUID,
      url: process.env.BUCKET_URL,
      folder: 'users',
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_KEY,
      },
    },
    db: testing
      ? {
          type: 'sqlite',
          dbName: 'test.db',
          entities: ['dist/**/*.entity.js', 'dist/**/*.embeddable.js'],
          entitiesTs: ['src/**/*.entity.ts', 'src/**/*.embeddable.ts'],
          loadStrategy: LoadStrategy.JOINED,
          allowGlobalContext: true,
        }
      : {
          type: 'postgresql',
          clientUrl: process.env.DATABASE_URL,
          entities: ['dist/**/*.entity.js', 'dist/**/*.embeddable.js'],
          entitiesTs: ['src/**/*.entity.ts', 'src/**/*.embeddable.ts'],
          loadStrategy: LoadStrategy.JOINED,
          allowGlobalContext: true,
        },
    redis: redisUrlToOptions(process.env.REDIS_URL),
    upload: {
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10),
      maxFiles: parseInt(process.env.MAX_FILES, 10),
    },
    testing,
  };
}
