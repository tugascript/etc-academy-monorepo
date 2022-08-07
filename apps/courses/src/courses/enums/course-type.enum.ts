import { registerEnumType } from '@nestjs/graphql';

export enum CourseTypeEnum {
  IN_PERSON = 'IN_PERSON',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID',
}

registerEnumType(CourseTypeEnum, {
  name: 'CourseType',
});
