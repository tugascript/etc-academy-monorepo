/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Collection,
  Embedded,
  Entity,
  OneToMany,
  OptionalProps,
  Property,
} from '@mikro-orm/core';
import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { BCRYPT_HASH, NAME_REGEX, SLUG_REGEX } from '../../common/constants';
import { LocalBaseEntity } from '../../common/entities';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { CredentialsEmbeddable } from '../embeddables/credentials.embeddable';
import { IUser } from '../interfaces/user.interface';

@ObjectType('User')
@Entity({ tableName: 'users' })
export class UserEntity extends LocalBaseEntity implements IUser {
  [OptionalProps]?:
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'picture'
    | 'onlineStatus'
    | 'defaultStatus'
    | 'confirmed'
    | 'suspended'
    | 'twoFactor'
    | 'credentials'
    | 'lastLogin'
    | 'lastOnline';

  @Field(() => String)
  @Property({ columnType: 'varchar(100)' })
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX)
  public name!: string;

  @Field(() => String)
  @Property({ columnType: 'varchar(110)', unique: true })
  @IsString()
  @Length(3, 110)
  @Matches(SLUG_REGEX)
  public username!: string;

  @Field(() => String)
  @Property({ columnType: 'varchar(250)', unique: true })
  @IsEmail()
  public email!: string;

  @Field(() => String, { nullable: true })
  @Property({ columnType: 'varchar(250)', nullable: true })
  @IsOptional()
  @IsUrl()
  public picture?: string;

  @Property({ columnType: 'varchar(60)' })
  @IsString()
  @Length(59, 60)
  @Matches(BCRYPT_HASH)
  public password!: string;

  @Property({ default: false })
  @IsBoolean()
  public confirmed: boolean = false;

  @Property({ default: false })
  @IsBoolean()
  public suspended: boolean = false;

  @Field(() => Boolean, { nullable: true })
  @Property({ default: false })
  @IsBoolean()
  public twoFactor: boolean = false;

  @Embedded(() => CredentialsEmbeddable)
  public credentials: CredentialsEmbeddable = new CredentialsEmbeddable();

  @Field(() => GraphQLTimestamp)
  @Property()
  @IsDate()
  public lastLogin: Date = new Date();

  @Field(() => GraphQLTimestamp)
  @Property()
  @IsDate()
  public lastOnline: Date = new Date();

  @OneToMany(() => ProfileEntity, (p) => p.user)
  public profiles: Collection<ProfileEntity, UserEntity> = new Collection<
    ProfileEntity,
    UserEntity
  >(this);

  @OneToMany(() => InstitutionEntity, (i) => i.owner)
  public institutions: Collection<InstitutionEntity, UserEntity> =
    new Collection<InstitutionEntity, UserEntity>(this);
}
