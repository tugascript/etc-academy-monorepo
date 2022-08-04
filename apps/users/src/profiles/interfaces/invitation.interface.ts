import { IBase } from 'app/common/interfaces';

export interface IInvitation extends IBase {
  email: string;
  accepted: boolean;
  acceptedAt?: Date;
}
