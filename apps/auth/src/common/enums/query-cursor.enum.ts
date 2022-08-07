import { registerEnumType } from '@nestjs/graphql';

export enum QueryCursorEnum {
  DATE = 'DATE',
  ALPHA = 'ALPHA',
}

registerEnumType(QueryCursorEnum, {
  name: 'QueryCursor',
});

export const getQueryCursor = (cursor: QueryCursorEnum): string =>
  cursor === QueryCursorEnum.ALPHA ? 'id' : 'slug';

export const getUserQueryCursor = (cursor: QueryCursorEnum): string =>
  cursor === QueryCursorEnum.ALPHA ? 'id' : 'username';
