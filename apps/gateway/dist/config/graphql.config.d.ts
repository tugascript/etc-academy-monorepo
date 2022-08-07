import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
export declare class GraphQLConfig implements GqlOptionsFactory<ApolloGatewayDriverConfig> {
    private readonly configService;
    private readonly testing;
    constructor(configService: ConfigService);
    createGqlOptions(): {
        driver: typeof ApolloGatewayDriver;
        server: {
            cors: {
                credentials: boolean;
            };
        };
        gateway: {
            supergraphSdl: IntrospectAndCompose;
        };
    };
}
