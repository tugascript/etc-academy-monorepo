import { registerEnumType } from '@nestjs/graphql';

export enum ProfileRoleEnum {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

registerEnumType(ProfileRoleEnum, {
  name: 'ProfileRole',
});
