import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { UserClientConfig } from '../config/user-client.config';
import { CoursesModule } from '../courses/courses.module';
import { CourseProfileEntity } from './entities/course-profile.entity';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([CourseProfileEntity]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'USER_SERVICE',
        useClass: UserClientConfig,
      },
    ]),
    forwardRef(() => CoursesModule),
  ],
  providers: [ProfilesResolver, ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
