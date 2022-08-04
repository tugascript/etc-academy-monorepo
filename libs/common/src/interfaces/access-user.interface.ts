import { ProfileRoleEnum } from '../enums/profile-role.enum';

export interface IAccessUser {
  id: number;
  role: ProfileRoleEnum;
}

export interface IAccessPayloadResponse extends IAccessUser {
  iat: number;
  exp: number;
}
