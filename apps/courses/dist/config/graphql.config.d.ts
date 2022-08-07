import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { MercuriusExtendedDriverConfig } from '../common/interfaces';
import { LoadersService } from '../loaders/loaders.service';
export declare class GraphQLConfig implements GqlOptionsFactory {
    private readonly configService;
    private readonly loadersService;
    private readonly testing;
    constructor(configService: ConfigService, loadersService: LoadersService);
    createGqlOptions(): MercuriusExtendedDriverConfig;
}
