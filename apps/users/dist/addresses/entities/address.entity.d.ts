import { LocalBaseEntity } from '../../common/entities';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { AddressTypeEnum } from '../enums/address-type.enum';
import { CountryCodesEnum } from '../enums/contry-codes.enum';
import { IAddress } from '../interfaces/address.interface';
export declare class AddressEntity extends LocalBaseEntity implements IAddress {
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
