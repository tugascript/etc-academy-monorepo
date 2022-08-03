import { IBase } from 'app/common/interfaces';

export interface IUser extends IBase {
  name: string;
  username: string;
  email: string;
  confirmed: boolean;
  suspended: boolean;
  picture?: string;
  lastOnline: Date;
  lastLogin: Date;
}
