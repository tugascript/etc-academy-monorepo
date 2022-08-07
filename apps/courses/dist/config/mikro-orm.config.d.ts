import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
export declare class MikroOrmConfig implements MikroOrmOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createMikroOrmOptions(): MikroOrmModuleOptions;
}
