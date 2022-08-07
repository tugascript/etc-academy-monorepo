import { IAccessProfile } from 'src/common/interfaces';
export interface IAccessPayload {
    id: number;
    name: string;
    roles: Record<number, IAccessProfile>;
}
export interface IAccessPayloadResponse extends IAccessPayload {
    iat: number;
    exp: number;
}
