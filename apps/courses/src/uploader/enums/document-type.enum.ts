import { registerEnumType } from '@nestjs/graphql';

export enum DocumentTypeEnum {
  PDF = 'PDF',
  DOCUMENT = 'DOCUMENT',
  PRESENTATION = 'PRESENTATION',
  CALC_SHEET = 'CALC_SHEET',
}

registerEnumType(DocumentTypeEnum, {
  name: 'DocumentType',
});
