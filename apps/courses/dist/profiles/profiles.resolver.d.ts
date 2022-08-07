import { FilterRelationDto } from '../common/dtos';
import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { FilterProfilesDto } from './dtos/filter-profiles.dto';
import { ProfileSlugDto } from './dtos/profile-slug.dto';
import { ProfileDto } from './dtos/profile.dto';
import { UpdateProfileStatusDto } from './dtos/update-profile-status.dto';
import { CourseProfileEntity } from './entities/course-profile.entity';
import { CreateProfileInput } from './inputs/create-profile.input';
import { ProfilesService } from './profiles.service';
export declare class ProfilesResolver {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    createCourseProfile(user: IAccessUser, input: CreateProfileInput): Promise<CourseProfileEntity>;
    updateCourseProfileStatus(user: IAccessUser, dto: UpdateProfileStatusDto): Promise<CourseProfileEntity>;
    deleteCourseProfile(user: IAccessUser, dto: ProfileDto): Promise<LocalMessageType>;
    courseProfileById(user: IAccessUser, dto: ProfileDto): Promise<CourseProfileEntity>;
    courseProfileBySlug(user: IAccessUser, dto: ProfileSlugDto): Promise<CourseProfileEntity>;
    filterCourseProfiles(user: IAccessUser, dto: FilterProfilesDto): Promise<IPaginated<CourseProfileEntity>>;
    resolveReference(_: IReference): void;
    getInstitutionProfile(profile: CourseProfileEntity): IReference;
    getAuthor(profile: CourseProfileEntity): IReference;
    getInstitution(profile: CourseProfileEntity): IReference;
    getManagedLessons(_: FilterRelationDto): void;
}
