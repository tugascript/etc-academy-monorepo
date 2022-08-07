import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';
export declare class ThrottlerConfig implements ThrottlerOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createThrottlerOptions(): ThrottlerModuleOptions;
}
