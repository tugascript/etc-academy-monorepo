import { DocumentTypeEnum } from '../enums/document-type.enum';
export interface IFileType {
    fileType: DocumentTypeEnum;
    extension: string;
}
