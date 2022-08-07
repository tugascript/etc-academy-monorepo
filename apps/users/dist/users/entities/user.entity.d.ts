import { Collection, OptionalProps } from '@mikro-orm/core';
import { LocalBaseEntity } from '../../common/entities';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { CredentialsEmbeddable } from '../embeddables/credentials.embeddable';
import { IUser } from '../interfaces/user.interface';
export declare class UserEntity extends LocalBaseEntity implements IUser {
    [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'picture' | 'onlineStatus' | 'defaultStatus' | 'confirmed' | 'suspended' | 'twoFactor' | 'credentials' | 'lastLogin' | 'lastOnline';
    name: string;
    username: string;
    email: string;
    picture?: string;
    password: string;
    confirmed: boolean;
    suspended: boolean;
    twoFactor: boolean;
    credentials: CredentialsEmbeddable;
    lastLogin: Date;
    lastOnline: Date;
    profiles: Collection<ProfileEntity, UserEntity>;
    institutions: Collection<InstitutionEntity, UserEntity>;
}
