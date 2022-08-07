import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthGuard, CommonModule } from 'src/common';
import { GraphQLFederationDriver } from 'src/common/drivers';
import { UploaderModule } from 'src/uploader';
import { AddressesModule } from './addresses/addresses.module';
import { AppController } from './app.controller';
import { config } from './config/config';
import { GqlConfigService } from './config/graphql.config';
import { MikroOrmConfig } from './config/mikroorm.config';
import { UploaderConfig } from './config/uploader.config';
import { validationSchema } from './config/validation';
import { EmailModule } from './email/email.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { LoadersModule } from './loaders/loaders.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';

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
    InstitutionsModule,
    AddressesModule,
    ProfilesModule,
    EmailModule,
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
