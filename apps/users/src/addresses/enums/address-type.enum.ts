import { registerEnumType } from '@nestjs/graphql';

export enum AddressTypeEnum {
  LOCATION = 'LOCATION',
  BILLING = 'BILLING',
}

registerEnumType(AddressTypeEnum, {
  name: 'AddressType',
});
