import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class CacheConfig implements CacheOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createCacheOptions(): CacheModuleOptions;
}
