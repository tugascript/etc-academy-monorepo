import { DocumentTypeEnum } from './enums';
import { IFileType } from './interfaces/file-type.interface';

export const BUCKET_OPTIONS = 'BUCKET_OPTIONS';
export const MAX_WIDTH = 2160;
export const QUALITY_ARRAY = [
  90, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10,
];
export const DOCUMENT_TYPES: Record<string, IFileType> = {
  'application/pdf': {
    fileType: DocumentTypeEnum.PDF,
    extension: '.pdf',
  },
  'application/msword': {
    fileType: DocumentTypeEnum.DOCUMENT,
    extension: '.doc',
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    fileType: DocumentTypeEnum.DOCUMENT,
    extension: '.docx',
  },
  'application/vnd.oasis.opendocument.text': {
    fileType: DocumentTypeEnum.DOCUMENT,
    extension: '.odt',
  },
  'application/vnd.ms-powerpoint': {
    fileType: DocumentTypeEnum.PRESENTATION,
    extension: '.ppt',
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    fileType: DocumentTypeEnum.PRESENTATION,
    extension: '.pptx',
  },
  'application/vnd.oasis.opendocument.presentation': {
    fileType: DocumentTypeEnum.PRESENTATION,
    extension: '.odp',
  },
  'application/vnd.ms-excel': {
    fileType: DocumentTypeEnum.CALC_SHEET,
    extension: '.xls',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    fileType: DocumentTypeEnum.CALC_SHEET,
    extension: '.xlsx',
  },
  'application/vnd.oasis.opendocument.spreadsheet': {
    fileType: DocumentTypeEnum.CALC_SHEET,
    extension: '.ods',
  },
};
