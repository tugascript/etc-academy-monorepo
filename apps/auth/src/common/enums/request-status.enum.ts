import { registerEnumType } from '@nestjs/graphql';

export enum RequestStatusEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

registerEnumType(RequestStatusEnum, {
  name: 'RequestStatus',
});
