import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import {
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
import { NAME_REGEX, SLUG_REGEX } from '../../common/constants';
import { LocalBaseEntity } from '../../common/entities';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
import { CourseProfileEntity } from '../../profiles/entities/course-profile.entity';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { ICourse } from '../interfaces/course.interface';

@ObjectType('Course')
@Entity({ tableName: 'courses' })
@Unique({ properties: ['name', 'institutionId'] })
export class CourseEntity extends LocalBaseEntity implements ICourse {
  @Field(() => String)
  @Property({ columnType: 'varchar(100)' })
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name: string;

  @Field(() => String)
  @Property({ columnType: 'varchar(110)', unique: true })
  @IsString()
  @Length(3, 110)
  @Matches(SLUG_REGEX)
  public slug: string;

  @Field(() => CourseTypeEnum)
  @Enum({
    items: () => CourseTypeEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(CourseTypeEnum)
  public courseType: CourseTypeEnum;

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'varchar(250)' })
  @IsString()
  @IsUrl()
  @IsOptional()
  public picture?: string;

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'text', nullable: true })
  @IsString()
  @Length(1, 500)
  @IsOptional()
  public description?: string;

  @Property({ columnType: 'int' })
  @IsNumber()
  @IsInt()
  @Min(1)
  public institutionId: number;

  @Property({ columnType: 'int' })
  @IsNumber()
  @IsInt()
  @Min(1)
  public authorId: number;

  @OneToMany(() => CourseProfileEntity, (cp) => cp.course)
  public profiles: Collection<CourseProfileEntity, CourseEntity> =
    new Collection<CourseProfileEntity, CourseEntity>(this);

  @OneToMany(() => LessonEntity, (l) => l.course)
  public lessons: Collection<LessonEntity, CourseEntity> = new Collection<
    LessonEntity,
    CourseEntity
  >(this);
}
