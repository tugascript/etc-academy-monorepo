import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { UploadOptions } from 'graphql-upload';
import { RedisOptions } from 'ioredis';
import { IMailerTransport } from '../../common/interfaces';
import { IBucketOptions } from '../../uploader/interfaces';
export interface IConfig {
    port: number;
    db: MikroOrmModuleOptions;
    bucketConfig: IBucketOptions;
    redis: RedisOptions;
    upload: UploadOptions;
    email: IMailerTransport;
    testing: boolean;
}
