import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { TITLE_REGEX } from '../../common/constants';
import { LocalBaseEntity } from '../../common/entities';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
import { DocumentTypeEnum } from '../../uploader/enums';
import { IResource } from '../interfaces/resouce.interface';

@ObjectType('LessonResource')
@Entity({ tableName: 'lesson_resources' })
export class ResourceEntity extends LocalBaseEntity implements IResource {
  @Field(() => String)
  @Property({ columnType: 'varchar(250)' })
  @IsString()
  @IsUrl()
  @Length(10, 250)
  public link: string;

  @Field(() => DocumentTypeEnum)
  @Enum({
    items: () => DocumentTypeEnum,
    columnType: 'varchar(12)',
  })
  @IsEnum(DocumentTypeEnum)
  public resourceType: DocumentTypeEnum;

  @Field(() => String)
  @Property({ columnType: 'varchar(150)' })
  @IsString()
  @Matches(TITLE_REGEX)
  @Length(3, 150)
  public title: string;

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'varchar(250)' })
  @IsString()
  @Length(3, 250)
  @IsOptional()
  public info?: string;

  @Field(() => LessonEntity)
  @ManyToOne({
    entity: () => LessonEntity,
    inversedBy: (l) => l.resources,
    onDelete: 'cascade',
  })
  public lesson: LessonEntity;
}
