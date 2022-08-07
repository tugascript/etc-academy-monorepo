import { LocalBaseType } from '../../common/entities/gql';
import { AddressTypeEnum } from '../enums/address-type.enum';
import { CountryCodesEnum } from '../enums/contry-codes.enum';
import { InstitutionEntity } from './institution.entity';
import { UserEntity } from './user.entity';
export declare class AddressEntity extends LocalBaseType {
    address: string;
    address2?: string;
    addressType: AddressTypeEnum;
    city: string;
    country: CountryCodesEnum;
    state: string;
    zipCode: string;
    institution: InstitutionEntity;
    author: UserEntity;
}
