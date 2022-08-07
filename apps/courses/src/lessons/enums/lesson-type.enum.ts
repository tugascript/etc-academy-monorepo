import { registerEnumType } from '@nestjs/graphql';

export enum LessonTypeEnum {
  IN_PERSON = 'IN_PERSON',
  ONLINE = 'ONLINE',
}

registerEnumType(LessonTypeEnum, {
  name: 'LessonType',
});
