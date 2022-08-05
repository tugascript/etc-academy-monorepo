import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLGatewayDriver } from '@app/common/drivers';
import { GqlConfigService } from './config/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      driver: GraphQLGatewayDriver,
      useClass: GqlConfigService,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
