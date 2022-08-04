import { registerEnumType } from '@nestjs/graphql';

export enum ProfileStatusEnum {
  STAFF = 'STAFF',
  ENROLLED = 'ENROLLED',
  STUDYING = 'STUDYING',
  GRADUATED = 'GRADUATED',
}

registerEnumType(ProfileStatusEnum, {
  name: 'ProfileStatus',
});
