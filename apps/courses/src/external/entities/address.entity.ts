import { Entity } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { LocalBaseType } from '../../common/entities/gql';
import { AddressTypeEnum } from '../enums/address-type.enum';
import { CountryCodesEnum } from '../enums/contry-codes.enum';
import { InstitutionEntity } from './institution.entity';
import { UserEntity } from './user.entity';

@ObjectType('Address')
@Entity({ abstract: true })
export class AddressEntity extends LocalBaseType {
  @Field(() => String)
  public address: string;

  @Field(() => String, { nullable: true })
  public address2?: string;

  @Field(() => AddressTypeEnum)
  public addressType: AddressTypeEnum;

  @Field(() => String)
  public city: string;

  @Field(() => CountryCodesEnum)
  public country: CountryCodesEnum;

  @Field(() => String)
  public state: string;

  @Field(() => String)
  public zipCode: string;

  @Field(() => InstitutionEntity)
  public institution: InstitutionEntity;

  @Field(() => UserEntity)
  public author: UserEntity;
}
