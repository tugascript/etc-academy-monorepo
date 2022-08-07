import { ProfileRoleEnum, ProfileStatusEnum } from 'src/common/enums';
export declare abstract class CreateProfileInput {
    institutionId: number;
    userEmail: string;
    userName: string;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
}
