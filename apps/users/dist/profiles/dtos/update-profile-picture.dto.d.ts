import { FileUploadDto } from 'src/uploader/dtos';
import { ProfileDto } from './profile.dto';
export declare abstract class UpdateProfilePictureDto extends ProfileDto {
    picture: Promise<FileUploadDto>;
}
