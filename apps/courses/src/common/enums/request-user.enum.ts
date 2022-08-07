import { registerEnumType } from '@nestjs/graphql';

export enum RequestUserEnum {
  SENDER = 'SENDER',
  RECIPIENT = 'RECIPIENT',
}

registerEnumType(RequestUserEnum, {
  name: 'RequestUser',
});
