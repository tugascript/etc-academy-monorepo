import { LocalBaseEntity } from '@app/common/entities';
import { IProfileRequest } from '../interfaces/profile-request.interface';
import {
  ProfileRoleEnum,
  ProfileStatusEnum,
  RequestStatusEnum,
} from '@app/common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Field } from '@nestjs/graphql';
import { Enum, ManyToOne } from '@mikro-orm/core';
import { IsEnum } from 'class-validator';

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
