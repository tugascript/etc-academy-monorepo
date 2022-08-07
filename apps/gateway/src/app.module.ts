import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { config } from './config/config';
import { GraphQLConfig } from './config/graphql.config';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      useClass: GraphQLConfig,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
