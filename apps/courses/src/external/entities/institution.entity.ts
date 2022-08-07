import { Entity } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { LocalBaseType } from '../../common/entities/gql';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';
import { UserEntity } from './user.entity';

@ObjectType('Institution')
@Entity({ abstract: true })
export class InstitutionEntity extends LocalBaseType {
  @Field(() => String)
  public name: string;

  @Field(() => InstitutionTypeEnum)
  public institutionType: InstitutionTypeEnum;

  @Field(() => String)
  public slug: string;

  @Field(() => String)
  public picture: string;

  @Field(() => String, { nullable: true })
  public description?: string;

  @Field(() => String)
  public vatNumber: string;

  @Field(() => UserEntity)
  public owner: UserEntity;
}
