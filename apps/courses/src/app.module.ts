import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLFederationDriver } from 'src/common/drivers';
import { UploaderModule } from 'src/uploader';
import { AppController } from './app.controller';
import { CommonModule } from './common';
import { config } from './config/config';
import { GraphQLConfig } from './config/graphql.config';
import { MikroOrmConfig } from './config/mikro-orm.config';
import { UploaderConfig } from './config/uploader.config';
import { validationSchema } from './config/validation';
import { CoursesModule } from './courses/courses.module';
import { InstitutionsResolver } from './external/institutions.resolver';
import { UsersResolver } from './external/users.resolver';
import { LessonsModule } from './lessons/lessons.module';
import { LoadersModule } from './loaders/loaders.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ResourcesModule } from './resources/resources.module';

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
      useClass: GraphQLConfig,
    }),
    UploaderModule.forRootAsync({
      imports: [ConfigModule],
      useClass: UploaderConfig,
    }),
    UsersResolver,
    InstitutionsResolver,
    CommonModule,
    CoursesModule,
    LessonsModule,
    ResourcesModule,
    LoadersModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
