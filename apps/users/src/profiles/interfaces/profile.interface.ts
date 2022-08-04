import { IBase } from 'app/common/interfaces';
import { IInstitution } from '../../institutions/interfaces/institution.interface';
import { ProfileRoleEnum, ProfileStatusEnum } from 'app/common/enums';
import { IUser } from '../../users/interfaces/user.interface';

export interface IProfile extends IBase {
  slug: string;
  role: ProfileRoleEnum;
  status: ProfileStatusEnum;
  picture?: string | null;
  institution: IInstitution;
  user: IUser;
}
