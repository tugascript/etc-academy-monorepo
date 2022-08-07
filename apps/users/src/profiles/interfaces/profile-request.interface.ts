import {
  ProfileRoleEnum,
  ProfileStatusEnum,
  RequestStatusEnum,
} from 'src/common/enums';
import { IBase } from 'src/common/interfaces';
import { IInstitution } from '../../institutions/interfaces/institution.interface';
import { IUser } from '../../users/interfaces/user.interface';

export interface IProfileRequest extends IBase {
  recipient: IUser;
  sender: IUser;
  institution: IInstitution;
  status: RequestStatusEnum;
  profileStatus: ProfileStatusEnum;
  profileRole: ProfileRoleEnum;
}
