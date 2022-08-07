import { ReadStream } from 'fs-capacitor';
export declare abstract class FileUploadDto {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => ReadStream;
}
