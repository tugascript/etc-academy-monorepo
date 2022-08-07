import { InitialAddressInput } from '../../addresses/inputs/initial-address.input';
import { FileUploadDto } from '../../uploader/dtos';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';
export declare class CreateInstitutionInput {
    name: string;
    institutionType: InstitutionTypeEnum;
    picture: Promise<FileUploadDto>;
    description?: string;
    vatNumber: string;
    address: InitialAddressInput;
}
