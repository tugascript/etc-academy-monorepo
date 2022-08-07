import { LocalBaseType } from '../../common/entities/gql';
export declare abstract class UserEntity extends LocalBaseType {
    name: string;
    username: string;
    email: string;
    picture?: string;
    twoFactor: boolean;
    lastOnline: Date;
    lastLogin: Date;
}
