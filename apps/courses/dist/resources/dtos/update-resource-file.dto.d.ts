import { FileUploadDto } from '../../uploader/dtos';
import { ResourceDto } from './resource.dto';
export declare abstract class UpdateResourceFileDto extends ResourceDto {
    file: Promise<FileUploadDto>;
}
