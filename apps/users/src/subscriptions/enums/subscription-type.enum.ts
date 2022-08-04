import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionTypeEnum {
  FREE = 'FREE',
  MICRO = 'MICRO',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

registerEnumType(SubscriptionTypeEnum, {
  name: 'SubscriptionType',
});
