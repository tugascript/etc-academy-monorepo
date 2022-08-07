import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';
export declare class CreateProfileInput {
    courseId: number;
    profileId: number;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
}
