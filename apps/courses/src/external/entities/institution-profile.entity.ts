import { Entity } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { LocalBaseType } from '../common/entities/gql';
import { ProfileRoleEnum, ProfileStatusEnum } from '../common/enums';
import { InstitutionEntity } from './institution.entity';
import { UserEntity } from './user.entity';

@ObjectType('InstitutionProfile')
@Entity({ abstract: true })
export class ProfileEntity extends LocalBaseType {
  @Field(() => String)
  public slug: string;

  @Field(() => ProfileRoleEnum)
  public role: ProfileRoleEnum;

  @Field(() => ProfileStatusEnum)
  public status: ProfileStatusEnum;

  @Field(() => String, { nullable: true })
  public picture?: string;

  @Field(() => InstitutionEntity)
  public institution: InstitutionEntity;

  @Field(() => UserEntity)
  public user: UserEntity;
}
