/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { Entity, Property } from '@mikro-orm/core';
import { LocalBaseEntity } from 'app/common/entities';
import { IInvitation } from '../interfaces/invitation.interface';
import { IsBoolean, IsDate, IsEmail, IsString, Length } from 'class-validator';

@ObjectType('Invitation')
@Entity({ tableName: 'invitations' })
export class InvitationEntity extends LocalBaseEntity implements IInvitation {
  @Field(() => String)
  @Property({ columnType: 'varchar(250)', unique: true })
  @IsString()
  @IsEmail()
  @Length(6, 250)
  public email: string;

  @Field(() => Boolean)
  @Property({ default: false })
  @IsBoolean()
  public accepted: boolean = false;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @Property({ nullable: true })
  @IsDate()
  public acceptedAt?: Date;
}
