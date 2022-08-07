import {
  IntrospectAndCompose,
  ServiceEndpointDefinition,
} from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphQLConfig
  implements GqlOptionsFactory<ApolloGatewayDriverConfig>
{
  private readonly testing = this.configService.get<boolean>('testing');

  constructor(private readonly configService: ConfigService) {}

  createGqlOptions() {
    return {
      driver: ApolloGatewayDriver,
      server: {
        cors: {
          credentials: true,
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs:
            this.configService.get<ServiceEndpointDefinition[]>('services'),
        }),
      },
    };
  }
}
