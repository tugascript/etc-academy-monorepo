import { IBase } from 'app/common/interfaces';
import { AddressTypeEnum } from '../enums/address-type.enum';
import { CountryCodesEnum } from '../enums/contry-codes.enum';
import { IInstitution } from '../../institutions/interfaces/institution.interface';
import { IUser } from '../../users/interfaces/user.interface';

export interface IAddress extends IBase {
  addressType: AddressTypeEnum;
  address: string;
  address2?: string | null;
  zipCode: string;
  city: string;
  state: string;
  country: CountryCodesEnum;
  author: IUser;
  institution: IInstitution;
}
