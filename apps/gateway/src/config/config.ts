import { redisUrlToOptions } from 'src/common/utils';
import { LoadStrategy } from '@mikro-orm/core';
import { IConfig } from './interfaces/config.interface';

export function config(): IConfig {
  const testing = process.env.NODE_ENV !== 'production';

  return {
    services: [
      {
        name: 'users',
        url: process.env.USERS_URL,
      },
      {
        name: 'courses',
        url: process.env.COURSES_URL,
      },
    ],
    port: parseInt(process.env.PORT, 10),
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
