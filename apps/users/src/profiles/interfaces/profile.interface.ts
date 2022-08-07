import { ProfileRoleEnum, ProfileStatusEnum } from 'src/common/enums';
import { IBase } from 'src/common/interfaces';
import { IInstitution } from '../../institutions/interfaces/institution.interface';
import { IUser } from '../../users/interfaces/user.interface';

export interface IProfile extends IBase {
  slug: string;
  role: ProfileRoleEnum;
  status: ProfileStatusEnum;
  picture?: string | null;
  institution: IInstitution;
  user: IUser;
}
