import { CountryCodesEnum } from '../enums/contry-codes.enum';
export declare abstract class UpdateAddressInput {
    institutionId: number;
    addressId: number;
    address?: string;
    address2?: string;
    city: string;
    country: CountryCodesEnum;
    state: string;
    zipCode: string;
}
