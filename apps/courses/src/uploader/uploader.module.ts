import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { BUCKET_OPTIONS } from './constants';
import {
  IBucketAsyncOptions,
  IBucketOptions,
  IBucketOptionsFactory,
} from './interfaces';
import { UploaderService } from './uploader.service';

@Global()
@Module({
  providers: [UploaderService],
  exports: [UploaderService],
})
export class UploaderModule {
  public static forRoot(options: IBucketOptions): DynamicModule {
    return {
      module: UploaderModule,
      providers: [
        {
          provide: BUCKET_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  public static forRootAsync(options: IBucketAsyncOptions): DynamicModule {
    return {
      module: UploaderModule,
      imports: options.imports,
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: IBucketAsyncOptions,
  ): Provider[] {
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: IBucketAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: BUCKET_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: BUCKET_OPTIONS,
      useFactory: async (optionsFactory: IBucketOptionsFactory) =>
        await optionsFactory.createBucketOptions(),
      inject: [options.useClass],
    };
  }
}
