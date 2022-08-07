import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/entities/gql';
import { CourseEntity } from '../course.entity';

@ObjectType('PaginatedCourses')
export abstract class PaginatedCoursesType extends Paginated<CourseEntity>(
  CourseEntity,
) {}
