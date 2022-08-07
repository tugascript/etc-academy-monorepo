import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProfilesModule } from '../profiles/profiles.module';
import { LessonEntity } from './entities/lesson.entity';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';

@Module({
  imports: [MikroOrmModule.forFeature([LessonEntity]), ProfilesModule],
  providers: [LessonsResolver, LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
