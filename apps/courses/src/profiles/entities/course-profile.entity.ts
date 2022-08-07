import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsString, Length, Matches } from 'class-validator';
import { SLUG_REGEX } from '../../common/constants';
import { LocalBaseEntity } from '../../common/entities';
import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';
import { CourseEntity } from '../../courses/entities/course.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
import { ICourseProfile } from '../interfaces/course-profile.interface';

@ObjectType('CourseProfile')
@Entity({ tableName: 'course_profiles' })
@Unique({ properties: ['course', 'userId'] })
@Unique({ properties: ['course', 'institutionProfileId'] })
export class CourseProfileEntity
  extends LocalBaseEntity
  implements ICourseProfile
{
  @Field(() => String)
  @Property({ columnType: 'varchar(110)', unique: true })
  @IsString()
  @Length(3, 110)
  @Matches(SLUG_REGEX)
  public slug: string;

  @Field(() => ProfileRoleEnum)
  @Enum({
    items: () => ProfileRoleEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(ProfileRoleEnum)
  public role: ProfileRoleEnum;

  @Field(() => ProfileStatusEnum)
  @Enum({
    items: () => ProfileStatusEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(ProfileStatusEnum)
  public status: ProfileStatusEnum;

  @Property({ columnType: 'int' })
  public userId: number;

  @Property({ columnType: 'int' })
  public institutionProfileId: number;

  @Property({ columnType: 'int' })
  public institutionId: number;

  @Field(() => CourseEntity)
  @ManyToOne({
    entity: () => CourseEntity,
    onDelete: 'cascade',
    inversedBy: (c) => c.profiles,
  })
  public course: CourseEntity;

  @OneToMany(() => LessonEntity, (l) => l.manager)
  public managedLessons: Collection<LessonEntity, CourseProfileEntity> =
    new Collection<LessonEntity, CourseProfileEntity>(this);
}
