import { IBase } from 'app/common/interfaces';
import { Collection } from '@mikro-orm/core';
import { IUser } from '../../users/interfaces/user.interface';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';

export interface IInstitution extends IBase {
  name: string;
  slug: string;
  institutionType: InstitutionTypeEnum;
  description?: string;
  picture: string;
  vatNumber: string;
  addresses: Collection<any, any>;
  profiles: Collection<any, any>;
  owner: IUser;
}
