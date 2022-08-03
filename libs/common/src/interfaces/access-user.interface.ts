import { UserRoleEnum } from '../enums/user-role.enum';

export interface IAccessUser {
  id: number;
  role: UserRoleEnum;
}

export interface IAccessPayloadResponse extends IAccessUser {
  iat: number;
  exp: number;
}
