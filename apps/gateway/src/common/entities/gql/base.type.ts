import {
  Directive,
  Field,
  GraphQLTimestamp,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { IBase } from '../../interfaces';

@ObjectType({ isAbstract: true })
@Directive('@extends')
@Directive('@key(fields: "id")')
export abstract class LocalBaseType implements IBase {
  @Field(() => ID)
  public id: number;

  @Field(() => GraphQLTimestamp)
  public createdAt: Date = new Date();

  @Field(() => GraphQLTimestamp)
  public updatedAt: Date = new Date();
}
