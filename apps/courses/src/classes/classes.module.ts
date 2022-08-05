import { Module } from '@nestjs/common';
import { ClassesResolver } from './classes.resolver';
import { ClassesService } from './classes.service';

@Module({
  providers: [ClassesResolver, ClassesService],
})
export class ClassesModule {}
