import { LocalBaseType } from '../../common/entities/gql';
import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';
import { InstitutionEntity } from './institution.entity';
import { UserEntity } from './user.entity';
export declare class ProfileEntity extends LocalBaseType {
    slug: string;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
    picture?: string;
    institution: InstitutionEntity;
    user: UserEntity;
}
