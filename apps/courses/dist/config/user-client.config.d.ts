import { ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsModuleOptionsFactory } from '@nestjs/microservices';
export declare class UserClientConfig implements ClientsModuleOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createClientOptions(): ClientProvider;
}
