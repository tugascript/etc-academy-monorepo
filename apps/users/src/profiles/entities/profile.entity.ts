import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Enum, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { LocalBaseEntity } from 'app/common/entities';
import { IProfile } from '../interfaces/profile.interface';
import { ProfileRoleEnum, ProfileStatusEnum } from 'app/common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { IsEnum, IsString, Length, Matches } from 'class-validator';
import { SLUG_REGEX } from 'app/common/constants';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType('Profile')
@Entity({ tableName: 'profiles' })
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

  @Field(() => InstitutionEntity)
  @ManyToOne({
    entity: () => InstitutionEntity,
    onDelete: 'cascade',
  })
  public institution: InstitutionEntity;

  @Field(() => UserEntity)
  @ManyToOne({
    entity: () => UserEntity,
    onDelete: 'cascade',
  })
  public user: UserEntity;
}
