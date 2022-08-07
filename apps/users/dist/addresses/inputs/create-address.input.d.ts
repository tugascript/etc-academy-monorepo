import { AddressTypeEnum } from '../enums/address-type.enum';
import { CountryCodesEnum } from '../enums/contry-codes.enum';
export declare abstract class CreateAddressInput {
    institutionId: number;
    addressType: AddressTypeEnum;
    address: string;
    address2?: string;
    city: string;
    country: CountryCodesEnum;
    state: string;
    zipCode: string;
}
