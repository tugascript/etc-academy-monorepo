import { ProfileRoleEnum } from '../enums/profile-role.enum';
import { ProfileStatusEnum } from '../enums/profile-status.enum';
export interface IMessageProfile {
    userName: string;
    userId: number;
    institutionId: number;
    profileId: number;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
}
