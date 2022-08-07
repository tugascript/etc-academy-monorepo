import { Entity, Enum, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsEnum,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { SLUG_REGEX } from '../../common/constants';
import { LocalBaseEntity } from '../../common/entities';
import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IProfile } from '../interfaces/profile.interface';

@ObjectType('InstitutionProfile')
@Entity({ tableName: 'institution_profiles' })
@Unique({ properties: ['user', 'institution'] })
export class ProfileEntity extends LocalBaseEntity implements IProfile {
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

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'varchar(250)', unique: true })
  @IsString()
  @IsUrl()
  @MaxLength(250)
  public picture?: string;

  @Field(() => InstitutionEntity)
  @ManyToOne({
    entity: () => InstitutionEntity,
    inversedBy: (i) => i.profiles,
    onDelete: 'cascade',
  })
  public institution: InstitutionEntity;

  @Field(() => UserEntity)
  @ManyToOne({
    entity: () => UserEntity,
    onDelete: 'cascade',
    inversedBy: (u) => u.profiles,
  })
  public user: UserEntity;
}
