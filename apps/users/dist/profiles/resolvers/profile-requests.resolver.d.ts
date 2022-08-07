import { LocalMessageType } from 'src/common/entities/gql';
import { IAccessUser, IPaginated, IReference } from 'src/common/interfaces';
import { FilterProfileRequestsDto } from '../dtos/filter-profile-requests.dto';
import { ProfileRequestDto } from '../dtos/profile-request.dto';
import { ProfileRequestEntity } from '../entities/profile-request.entity';
import { CreateProfileInput } from '../inputs/create-profile.input';
import { RespondToProfileRequestInput } from '../inputs/respond-to-profile-request.input';
import { ProfilesService } from '../profiles.service';
export declare class ProfileRequestsResolver {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    sendProfileRequest(user: IAccessUser, input: CreateProfileInput): Promise<LocalMessageType>;
    respondToProfileRequest(user: IAccessUser, input: RespondToProfileRequestInput): Promise<LocalMessageType>;
    acceptRejectedProfileRequest(user: IAccessUser, dto: ProfileRequestDto): Promise<LocalMessageType>;
    filterProfileRequests(user: IAccessUser, dto: FilterProfileRequestsDto): Promise<IPaginated<ProfileRequestEntity>>;
    resolveReference(_: IReference): void;
}
