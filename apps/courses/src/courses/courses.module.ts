import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { ProfilesModule } from '../profiles/profiles.module';
import { CoursesResolver } from './courses.resolver';
import { CoursesService } from './courses.service';
import { CourseEntity } from './entities/course.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([CourseEntity]),
    forwardRef(() => ProfilesModule),
  ],
  providers: [CoursesResolver, CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
