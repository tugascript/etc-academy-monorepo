import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { LocalBaseEntity } from '../../common/entities';
import {
  ProfileRoleEnum,
  ProfileStatusEnum,
  RequestStatusEnum,
} from '../../common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IProfileRequest } from '../interfaces/profile-request.interface';

@ObjectType('ProfileRequest')
@Entity({ tableName: 'profile_requests' })
export class ProfileRequestEntity
  extends LocalBaseEntity
  implements IProfileRequest
{
  @Field(() => RequestStatusEnum)
  @Enum({
    items: () => RequestStatusEnum,
    columnType: 'varchar(8)',
    default: RequestStatusEnum.PENDING,
  })
  @IsEnum(RequestStatusEnum)
  public status: RequestStatusEnum = RequestStatusEnum.PENDING;

  @Field(() => ProfileStatusEnum)
  @Enum({
    items: () => ProfileStatusEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(ProfileStatusEnum)
  public profileStatus: ProfileStatusEnum;

  @Field(() => ProfileRoleEnum)
  @Enum({
    items: () => ProfileRoleEnum,
    columnType: 'varchar(9)',
  })
  @IsEnum(ProfileRoleEnum)
  public profileRole: ProfileRoleEnum;

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
  public recipient: UserEntity;

  @Field(() => UserEntity)
  @ManyToOne({
    entity: () => UserEntity,
    onDelete: 'cascade',
  })
  public sender: UserEntity;
}
