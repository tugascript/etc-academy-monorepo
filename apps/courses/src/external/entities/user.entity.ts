import { Entity } from '@mikro-orm/core';
import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { LocalBaseType } from '../../common/entities/gql';

@ObjectType('User')
@Entity({ abstract: true })
export abstract class UserEntity extends LocalBaseType {
  @Field(() => String)
  public name!: string;
  @Field(() => String)
  public username: string;

  @Field(() => String)
  public email: string;

  @Field(() => String, { nullable: true })
  public picture?: string;

  @Field(() => Boolean, { nullable: true })
  public twoFactor: boolean;

  @Field(() => GraphQLTimestamp)
  public lastOnline: Date;

  @Field(() => GraphQLTimestamp)
  public lastLogin: Date;
}
