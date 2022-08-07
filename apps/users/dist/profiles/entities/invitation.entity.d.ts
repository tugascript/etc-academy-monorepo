import { LocalBaseEntity } from '../../common/entities';
import { ProfileRoleEnum, ProfileStatusEnum, RequestStatusEnum } from '../../common/enums';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IInvitation } from '../interfaces/invitation.interface';
export declare class InvitationEntity extends LocalBaseEntity implements IInvitation {
    email: string;
    status: RequestStatusEnum;
    profileRole: ProfileRoleEnum;
    profileStatus: ProfileStatusEnum;
    institution: InstitutionEntity;
    sender: UserEntity;
}
