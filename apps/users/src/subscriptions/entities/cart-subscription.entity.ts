import { LocalBaseEntity } from 'app/common/entities';
import { ICartSubscription } from '../interfaces/cart-subscription.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { SubscriptionTypeEnum } from '../enums/subscription-type.enum';
import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';

@ObjectType('CartSubscription')
@Entity({ tableName: 'cart_subscriptions' })
export class CartSubscriptionEntity
  extends LocalBaseEntity
  implements ICartSubscription
{
  @Field(() => SubscriptionTypeEnum)
  @Enum({
    items: () => SubscriptionTypeEnum,
    columnType: 'varchar(6)',
  })
  public subscriptionType: SubscriptionTypeEnum;

  @Field(() => InstitutionEntity)
  @ManyToOne({
    entity: () => InstitutionEntity,
    onDelete: 'cascade',
  })
  public institution: InstitutionEntity;
}
