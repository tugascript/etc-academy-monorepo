import { IUser } from '../../users/interfaces/user.interface';
import { IInstitution } from '../../institutions/interfaces/institution.interface';
import {
  ProfileRoleEnum,
  ProfileStatusEnum,
  RequestStatusEnum,
} from '@app/common/enums';
import { IBase } from '@app/common/interfaces';

export interface IProfileRequest extends IBase {
  recipient: IUser;
  sender: IUser;
  institution: IInstitution;
  status: RequestStatusEnum;
  profileStatus: ProfileStatusEnum;
  profileRole: ProfileRoleEnum;
}
