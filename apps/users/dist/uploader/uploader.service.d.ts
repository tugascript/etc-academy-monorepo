import { FileUploadDto } from './dtos';
import { IBucketOptions } from './interfaces';
export declare class UploaderService {
    private readonly client;
    private readonly bucketData;
    private readonly bucketNamespace;
    private readonly baseFolder;
    constructor(options: IBucketOptions);
    uploadImage(userId: number, file: Promise<FileUploadDto>, ratio?: number): Promise<string>;
    uploadDocument(userId: number, file: Promise<FileUploadDto>): Promise<string>;
    deleteFile(url: string): Promise<void>;
    private validateImage;
    private validateBucketUrl;
    private compressImage;
    private streamToBuffer;
    private uploadFile;
    private throwInternalError;
}
