import { ServiceEndpointDefinition } from '@apollo/gateway';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { UploadOptions } from 'graphql-upload';
import { RedisOptions } from 'ioredis';
export interface IConfig {
    port: number;
    db: MikroOrmModuleOptions;
    redis: RedisOptions;
    testing: boolean;
    services: ServiceEndpointDefinition[];
    upload: UploadOptions;
}
