/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { TITLE_REGEX } from '../../common/constants';
import { LocalBaseEntity } from '../../common/entities';
import { CourseEntity } from '../../courses/entities/course.entity';
import { CourseProfileEntity } from '../../profiles/entities/course-profile.entity';
import { ResourceEntity } from '../../resources/entities/resource.entity';
import { LessonTypeEnum } from '../enums/lesson-type.enum';
import { ILesson } from '../interfaces/lesson.interface';

@ObjectType('Lesson')
@Entity({ tableName: 'lessons' })
export class LessonEntity extends LocalBaseEntity implements ILesson {
  @Field(() => String)
  @Property({ columnType: 'varchar(150)' })
  @IsString()
  @Matches(TITLE_REGEX)
  @Length(3, 150)
  public title: string;

  @Field(() => Boolean)
  @Property({ default: false })
  @IsBoolean()
  public available: boolean = false;

  @Field(() => LessonTypeEnum)
  @Enum({
    items: () => LessonTypeEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(LessonTypeEnum)
  public lessonType: LessonTypeEnum;

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'varchar(250)', nullable: true })
  @IsString()
  @IsUrl()
  @IsOptional()
  public link?: string;

  @Field(() => Int)
  @Property({ columnType: 'int' })
  @IsNumber()
  @IsInt()
  @Min(1)
  public num: number;

  @Field(() => GraphQLTimestamp)
  @Property({ type: 'timestamp' })
  @IsDate()
  public time: Date;

  @Field(() => CourseEntity)
  @ManyToOne({
    entity: () => CourseEntity,
    onDelete: 'cascade',
    inversedBy: (c) => c.lessons,
  })
  public course: CourseEntity;

  @Field(() => CourseProfileEntity)
  @ManyToOne({
    entity: () => CourseProfileEntity,
    onDelete: 'cascade',
    inversedBy: (c) => c.managedLessons,
  })
  public manager: CourseProfileEntity;

  @OneToMany(() => ResourceEntity, (r) => r.lesson)
  public resources: Collection<ResourceEntity, LessonEntity> = new Collection<
    ResourceEntity,
    LessonEntity
  >(this);
}
