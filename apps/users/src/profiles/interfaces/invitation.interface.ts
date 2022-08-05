import { IBase } from '@app/common/interfaces';
import {
  ProfileRoleEnum,
  ProfileStatusEnum,
  RequestStatusEnum,
} from '@app/common/enums';
import { IInstitution } from '../../institutions/interfaces/institution.interface';
import { IUser } from '../../users/interfaces/user.interface';

export interface IInvitation extends IBase {
  email: string;
  status: RequestStatusEnum;
  profileRole: ProfileRoleEnum;
  profileStatus: ProfileStatusEnum;
  institution: IInstitution;
  sender: IUser;
}
