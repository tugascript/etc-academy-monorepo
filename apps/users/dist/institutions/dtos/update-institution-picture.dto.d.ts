import { FileUploadDto } from '../../uploader/dtos';
import { InstitutionDto } from './institution.dto';
export declare abstract class UpdateInstitutionPictureDto extends InstitutionDto {
    picture: Promise<FileUploadDto>;
}
