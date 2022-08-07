import { InstitutionDto } from '../../institutions/dtos/institution.dto';
import { AddressTypeEnum } from '../enums/address-type.enum';
export declare abstract class AddressTypeDto extends InstitutionDto {
    addressType: AddressTypeEnum;
}
