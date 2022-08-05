import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule, ClassesModule],
  controllers: [AppController],
})
export class AppModule {}
