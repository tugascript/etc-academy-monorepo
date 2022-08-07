import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LessonsModule } from '../lessons/lessons.module';
import { ResourceEntity } from './entities/resource.entity';
import { ResourcesResolver } from './resources.resolver';
import { ResourcesService } from './resources.service';

@Module({
  imports: [MikroOrmModule.forFeature([ResourceEntity]), LessonsModule],
  providers: [ResourcesResolver, ResourcesService],
})
export class ResourcesModule {}
