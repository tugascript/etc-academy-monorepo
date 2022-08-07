import { ProfileRoleEnum } from '../enums/profile-role.enum';
import { ProfileStatusEnum } from '../enums/profile-status.enum';
export interface IAccessProfile {
    id: number;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
}
export interface IAccessUser {
    id: number;
    name: string;
    roles: Record<number, IAccessProfile>;
}
export interface IAccessPayloadResponse extends IAccessUser {
    iat: number;
    exp: number;
}
