import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../common/entities/gql';
import { CourseProfileEntity } from '../course-profile.entity';

@ObjectType('PaginatedCourseProfiles')
export class PaginatedCourseProfilesType extends Paginated<CourseProfileEntity>(
  CourseProfileEntity,
) {}
