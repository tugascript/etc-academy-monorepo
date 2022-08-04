import { LocalBaseEntity } from 'app/common/entities';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { IInstitution } from '../interfaces/institution.interface';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { NAME_REGEX, SLUG_REGEX } from 'app/common/constants';
import { AddressEntity } from '../../addresses/entities/address.entity';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';

@ObjectType('Institution')
@Entity({ tableName: 'institutions' })
@Unique({ properties: ['name', 'owner'] })
export class InstitutionEntity extends LocalBaseEntity implements IInstitution {
  @Field(() => String)
  @Property({ columnType: 'varchar(100)' })
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name: string;

  @Field(() => InstitutionTypeEnum)
  @Enum({
    items: () => InstitutionTypeEnum,
    columnType: 'varchar(10)',
  })
  @IsEnum(InstitutionTypeEnum)
  public institutionType: InstitutionTypeEnum;

  @Field(() => String)
  @Property({ columnType: 'varchar(110)', unique: true })
  @IsString()
  @Length(3, 110)
  @Matches(SLUG_REGEX)
  public slug: string;

  @Field(() => String)
  @Property({ columnType: 'varchar(250)' })
  @IsString()
  @IsUrl()
  public picture: string;

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'text', nullable: true })
  @IsString()
  @Length(1, 500)
  @IsOptional()
  public description?: string;

  @Field(() => String)
  @Property({ columnType: 'varchar(250)' })
  @IsString()
  @Length(3, 30)
  public vatNumber: string;

  @Field(() => UserEntity)
  @ManyToOne({
    entity: () => UserEntity,
    onDelete: 'cascade',
  })
  public owner: UserEntity;

  @OneToMany(() => AddressEntity, (a) => a.institution)
  public addresses: Collection<AddressEntity, InstitutionEntity> =
    new Collection<AddressEntity, InstitutionEntity>(this);

  @OneToMany(() => ProfileEntity, (p) => p.institution)
  public profiles: Collection<ProfileEntity, InstitutionEntity> =
    new Collection<ProfileEntity, InstitutionEntity>(this);
}
