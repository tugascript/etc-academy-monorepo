import { CountryCodesEnum } from '../enums/contry-codes.enum';
export declare abstract class InitialAddressInput {
    address: string;
    address2?: string;
    city: string;
    country: CountryCodesEnum;
    state: string;
    zipCode: string;
}
