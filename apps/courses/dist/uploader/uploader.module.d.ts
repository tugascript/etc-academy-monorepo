import { DynamicModule } from '@nestjs/common';
import { IBucketAsyncOptions, IBucketOptions } from './interfaces';
export declare class UploaderModule {
    static forRoot(options: IBucketOptions): DynamicModule;
    static forRootAsync(options: IBucketAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
