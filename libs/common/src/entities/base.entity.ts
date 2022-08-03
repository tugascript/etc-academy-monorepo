import { IBase } from 'app/common/interfaces';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import {
  Directive,
  Field,
  GraphQLTimestamp,
  ID,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@Directive('@key(fields: "id")')
@Entity({ abstract: true })
export abstract class LocalBaseEntity implements IBase {
  @Field(() => ID)
  @PrimaryKey()
  public id: number;

  @Field(() => GraphQLTimestamp)
  @Property({ onCreate: () => new Date() })
  public createdAt: Date = new Date();

  @Field(() => GraphQLTimestamp)
  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();
}
