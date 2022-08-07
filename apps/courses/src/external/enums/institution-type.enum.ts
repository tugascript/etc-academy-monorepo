import { registerEnumType } from '@nestjs/graphql';

export enum InstitutionTypeEnum {
  PERSONAL = 'PERSONAL',
  SCHOOL = 'SCHOOL',
  TUTOR = 'TUTOR',
  UNIVERSITY = 'UNIVERSITY',
  COLLEGE = 'COLLEGE',
  OTHER = 'OTHER',
}

registerEnumType(InstitutionTypeEnum, {
  name: 'InstitutionType',
});
