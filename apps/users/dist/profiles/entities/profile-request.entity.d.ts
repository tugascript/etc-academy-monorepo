import { LocalBaseEntity } from '../../common/entities';
import { ProfileRoleEnum, ProfileStatusEnum, RequestStatusEnum } from '../../common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IProfileRequest } from '../interfaces/profile-request.interface';
export declare class ProfileRequestEntity extends LocalBaseEntity implements IProfileRequest {
    status: RequestStatusEnum;
    profileStatus: ProfileStatusEnum;
    profileRole: ProfileRoleEnum;
    institution: InstitutionEntity;
    recipient: UserEntity;
    sender: UserEntity;
}
