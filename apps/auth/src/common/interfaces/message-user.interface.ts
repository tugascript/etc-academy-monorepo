import { IBase } from './base.interface';

export interface IMessageUser extends IBase {
  name: string;
  username: string;
  email: string;
  picture?: string | null;
  count: number;
  lastOnline: Date;
  lastLogin: Date;
  confirmed: boolean;
  suspended: boolean;
  twoFactor: boolean;
}
