import { TokenDto } from 'src/common/dtos';
import { LocalMessageType } from 'src/common/entities/gql';
import { IAccessUser, IReference } from 'src/common/interfaces';
import { GetInvitationsDto } from '../dtos/get-invitations.dto';
import { InvitationDto } from '../dtos/invitation.dto';
import { InvitationEntity } from '../entities/invitation.entity';
import { RespondToInvitationInput } from '../inputs/respond-to-invitation.input';
import { ProfilesService } from '../profiles.service';
export declare class InvitationsResolver {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    respondToInvitation(user: IAccessUser, input: RespondToInvitationInput): Promise<LocalMessageType>;
    acceptRejectedInvitation(user: IAccessUser, dto: InvitationDto): Promise<LocalMessageType>;
    invitationByToken(dto: TokenDto): Promise<InvitationEntity>;
    invitationsByUser(user: IAccessUser, dto: GetInvitationsDto): Promise<InvitationEntity[]>;
    resolveReference(_: IReference): void;
}
