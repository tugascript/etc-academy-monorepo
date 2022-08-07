import { registerEnumType } from '@nestjs/graphql';

export enum PrivacyEnum {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  PRODUCT = 'PRODUCT',
  FOLLOWERS = 'FOLLOWERS',
}

registerEnumType(PrivacyEnum, {
  name: 'Privacy',
});
