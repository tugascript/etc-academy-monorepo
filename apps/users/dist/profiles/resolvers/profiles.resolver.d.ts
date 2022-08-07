import { IAccessUser, IPaginated, IReference } from 'src/common/interfaces';
import { FilterProfilesDto } from '../dtos/filter-profiles.dto';
import { ProfileRelationsDto } from '../dtos/profile-relations.dto';
import { ProfileSlugDto } from '../dtos/profile-slug.dto';
import { ProfileDto } from '../dtos/profile.dto';
import { UpdateProfilePictureDto } from '../dtos/update-profile-picture.dto';
import { UpdateProfileRoleDto } from '../dtos/update-profile-role.dto';
import { UpdateProfileStatusDto } from '../dtos/update-profile-status.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfilesService } from '../profiles.service';
export declare class ProfilesResolver {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    updateProfilePicture(user: IAccessUser, dto: UpdateProfilePictureDto): Promise<ProfileEntity>;
    updateProfileStatus(user: IAccessUser, dto: UpdateProfileStatusDto): Promise<ProfileEntity>;
    updateProfileRole(user: IAccessUser, dto: UpdateProfileRoleDto): Promise<ProfileEntity>;
    profileById(user: IAccessUser, dto: ProfileDto): Promise<ProfileEntity>;
    profileBySlug(user: IAccessUser, dto: ProfileSlugDto): Promise<ProfileEntity>;
    profileByRelations(user: IAccessUser, dto: ProfileRelationsDto): Promise<ProfileEntity>;
    filterProfiles(user: IAccessUser, dto: FilterProfilesDto): Promise<IPaginated<ProfileEntity>>;
    resolveReference(_: IReference): void;
}
