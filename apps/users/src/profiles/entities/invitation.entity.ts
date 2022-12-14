/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Enum, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { LocalBaseEntity } from '../../common/entities';
import {
  ProfileRoleEnum,
  ProfileStatusEnum,
  RequestStatusEnum,
} from '../../common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IInvitation } from '../interfaces/invitation.interface';

@ObjectType('Invitation')
@Entity({ tableName: 'invitations' })
@Unique({ properties: ['email', 'institution'] })
export class InvitationEntity extends LocalBaseEntity implements IInvitation {
  @Field(() => String)
  @Property({ columnType: 'varchar(250)' })
  @IsString()
  @IsEmail()
  @Length(6, 250)
  public email: string;

  @Field(() => RequestStatusEnum)
  @Enum({
    items: () => RequestStatusEnum,
    columnType: 'varchar(8)',
    default: RequestStatusEnum.PENDING,
  })
  public status: RequestStatusEnum = RequestStatusEnum.PENDING;

  @Field(() => ProfileRoleEnum)
  @Enum({
    items: () => ProfileRoleEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(ProfileRoleEnum)
  public profileRole: ProfileRoleEnum;

  @Field(() => ProfileStatusEnum)
  @Enum({
    items: () => ProfileStatusEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(ProfileStatusEnum)
  public profileStatus: ProfileStatusEnum;

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
  public sender: UserEntity;
}
