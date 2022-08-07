import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/entities/gql';
import { LessonEntity } from '../lesson.entity';

@ObjectType('PaginatedLessons')
export class PaginatedLessonsType extends Paginated<LessonEntity>(
  LessonEntity,
) {}
