import { Entity } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('CourseProfile')
@Entity({ tableName: 'course_profiles' })
export class CourseProfile extends LocalBaseEntity {}
