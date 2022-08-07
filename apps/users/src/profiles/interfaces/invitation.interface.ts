import {
  ProfileRoleEnum,
  ProfileStatusEnum,
  RequestStatusEnum,
} from 'src/common/enums';
import { IBase } from 'src/common/interfaces';
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
