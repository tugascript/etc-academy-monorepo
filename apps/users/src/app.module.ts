import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AuthGuard, CommonModule } from 'app/common';
import { config } from './config/config';
import { GqlConfigService } from './config/graphql.config';
import { MikroOrmConfig } from './config/mikroorm.config';
import { validationSchema } from './config/validation';
import { UsersModule } from './users/users.module';
import { LoadersModule } from './loaders/loaders.module';
import { UploaderModule } from 'app/uploader';
import { UploaderConfig } from './config/uploader.config';
import { GraphQLFederationDriver } from 'app/common/drivers';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MikroOrmConfig,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, LoadersModule],
      driver: GraphQLFederationDriver,
      useClass: GqlConfigService,
    }),
    UploaderModule.forRootAsync({
      imports: [ConfigModule],
      useClass: UploaderConfig,
    }),
    UsersModule,
    CommonModule,
    LoadersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
