import { IBase } from 'app/common/interfaces';
import { Collection } from '@mikro-orm/core';
import { IUser } from '../../users/interfaces/user.interface';

export interface IInstitution extends IBase {
  name: string;
  slug: string;
  description?: string;
  picture: string;
  vatNumber: string;
  addresses: Collection<any, any>;
  profiles: Collection<any, any>;
  owner: IUser;
}
