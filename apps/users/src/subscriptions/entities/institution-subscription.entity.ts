import { ISubscription } from '../interfaces/subscription.interface';
import { LocalBaseEntity } from 'app/common/entities';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { SubscriptionTypeEnum } from '../enums/subscription-type.enum';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { IsDate } from 'class-validator';

@ObjectType('InstitutionSubscription')
@Entity({ tableName: 'institution_subscriptions' })
export class InstitutionSubscriptionEntity
  extends LocalBaseEntity
  implements ISubscription
{
  @Property({ columnType: 'varchar(36)', unique: true })
  public stripeId: string;

  @Field(() => SubscriptionTypeEnum)
  @Enum({
    items: () => SubscriptionTypeEnum,
    columnType: 'varchar(6)',
  })
  public subscriptionType: SubscriptionTypeEnum;

  @Field(() => Boolean)
  @Property({ default: true })
  public active: boolean;

  @Field(() => Boolean)
  @Property({ default: false })
  public cancelled: boolean;

  @Field(() => GraphQLTimestamp)
  @Property({ type: 'timestamp', onCreate: () => new Date() })
  @IsDate()
  public startDate: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @Property({ type: 'timestamp' })
  @IsDate()
  public endDate?: Date;

  @Field(() => InstitutionEntity)
  @ManyToOne({
    entity: () => InstitutionEntity,
    onDelete: 'cascade',
  })
  public institution: InstitutionEntity;
}
