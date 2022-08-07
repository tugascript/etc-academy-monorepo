import { Credentials, Provider } from '@aws-sdk/types';
import { ModuleMetadata, Type } from '@nestjs/common';
export interface IBucketOptions {
    name: string;
    region: string;
    host: string;
    uuid: string;
    folder: string;
    url: string;
    credentials: Credentials | Provider<Credentials>;
}
export interface IBucketOptionsFactory {
    createBucketOptions(): Promise<IBucketOptions> | IBucketOptions;
}
export interface IBucketAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<IBucketOptions> | IBucketOptions;
    useClass?: Type<IBucketOptionsFactory>;
    inject?: any[];
}
