import { LocalBaseEntity } from '../../common/entities';
import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IProfile } from '../interfaces/profile.interface';
export declare class ProfileEntity extends LocalBaseEntity implements IProfile {
    slug: string;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
    picture?: string;
    institution: InstitutionEntity;
    user: UserEntity;
}
