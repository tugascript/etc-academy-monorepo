import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { LocalBaseEntity } from 'app/common/entities';
import { IAddress } from '../interfaces/address.interface';
import { AddressTypeEnum } from '../enums/address-type.enum';
import { CountryCodesEnum } from '../enums/contry-codes.enum';
import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { ADDRESS_REGEX, NAME_REGEX } from 'app/common/constants';

@ObjectType('Address')
@Entity({ tableName: 'addresses' })
export class AddressEntity extends LocalBaseEntity implements IAddress {
  @Field(() => String)
  @Property({ columnType: 'varchar(150)' })
  @IsString()
  @Matches(ADDRESS_REGEX)
  @Length(3, 150)
  public address: string;

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'varchar(150)', nullable: true })
  @IsString()
  @Matches(ADDRESS_REGEX)
  @Length(1, 150)
  @IsOptional()
  public address2?: string;

  @Field(() => AddressTypeEnum)
  @Enum({ items: () => AddressTypeEnum, columnType: 'varchar(8)' })
  @IsEnum(AddressTypeEnum)
  public addressType: AddressTypeEnum;

  @Field(() => String)
  @Property({ columnType: 'varchar(100)' })
  @IsString()
  @Matches(NAME_REGEX)
  @Length(3, 100)
  public city: string;

  @Field(() => CountryCodesEnum)
  @Enum({ items: () => CountryCodesEnum, columnType: 'varchar(2)' })
  @IsEnum(CountryCodesEnum)
  public country: CountryCodesEnum;

  @Field(() => String)
  @Property({ columnType: 'varchar(100)' })
  @IsString()
  @Matches(NAME_REGEX)
  @Length(2, 100)
  public state: string;

  @Field(() => String)
  @Property({ columnType: 'varchar(30)' })
  @IsString()
  @Length(3, 30)
  public zipCode: string;

  @Property({ columnType: 'int' })
  public authorId: number;

  @Field(() => InstitutionEntity)
  @ManyToOne({
    entity: () => InstitutionEntity,
    onDelete: 'cascade',
  })
  public institution: InstitutionEntity;
}
