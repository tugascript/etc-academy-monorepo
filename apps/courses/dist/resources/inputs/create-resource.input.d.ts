import { FileUploadDto } from '../../uploader/dtos';
export declare class CreateResourceInput {
    lessonId: number;
    title: string;
    info?: string;
    file: Promise<FileUploadDto>;
}
