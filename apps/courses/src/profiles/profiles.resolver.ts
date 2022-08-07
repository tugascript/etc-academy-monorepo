import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators';
import { FilterRelationDto } from '../common/dtos';
import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { ProfileEntity } from '../external/entities/institution-profile.entity';
import { InstitutionEntity } from '../external/entities/institution.entity';
import { UserEntity } from '../external/entities/user.entity';
import { PaginatedLessonsType } from '../lessons/entities/gql/paginated-lessons.type';
import { FilterProfilesDto } from './dtos/filter-profiles.dto';
import { ProfileSlugDto } from './dtos/profile-slug.dto';
import { ProfileDto } from './dtos/profile.dto';
import { UpdateProfileStatusDto } from './dtos/update-profile-status.dto';
import { CourseProfileEntity } from './entities/course-profile.entity';
import { PaginatedCourseProfilesType } from './entities/gql/paginated-course-profiles.type';
import { CreateProfileInput } from './inputs/create-profile.input';
import { ProfilesService } from './profiles.service';

@Resolver(() => CourseProfileEntity)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => CourseProfileEntity)
  public async createCourseProfile(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: CreateProfileInput,
  ): Promise<CourseProfileEntity> {
    return this.profilesService.createProfile(user, input);
  }

  @Mutation(() => CourseProfileEntity)
  public async updateCourseProfileStatus(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateProfileStatusDto,
  ): Promise<CourseProfileEntity> {
    return this.profilesService.updateProfileStatus(user, dto);
  }

  @Mutation(() => LocalMessageType)
  public async deleteCourseProfile(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfileDto,
  ): Promise<LocalMessageType> {
    return this.profilesService.deleteProfile(user, dto);
  }

  @Query(() => CourseProfileEntity)
  public async courseProfileById(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfileDto,
  ): Promise<CourseProfileEntity> {
    return this.profilesService.profileById(user, dto);
  }

  @Query(() => CourseProfileEntity)
  public async courseProfileBySlug(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfileSlugDto,
  ): Promise<CourseProfileEntity> {
    return this.profilesService.profileBySlug(user, dto);
  }

  @Query(() => PaginatedCourseProfilesType)
  public async filterCourseProfiles(
    @CurrentUser() user: IAccessUser,
    @Args() dto: FilterProfilesDto,
  ): Promise<IPaginated<CourseProfileEntity>> {
    return this.profilesService.filterProfiles(user, dto);
  }

  @ResolveReference()
  public resolveReference(_: IReference) {
    return;
  }

  @ResolveField('institutionProfile', () => ProfileEntity)
  public getInstitutionProfile(
    @Parent() profile: CourseProfileEntity,
  ): IReference {
    return {
      __typename: 'InstitutionProfile',
      id: profile.institutionProfileId.toString(),
    };
  }

  @ResolveField('user', () => UserEntity)
  public getAuthor(@Parent() profile: CourseProfileEntity): IReference {
    return { __typename: 'User', id: profile.userId.toString() };
  }

  @ResolveField('institution', () => InstitutionEntity)
  public getInstitution(@Parent() profile: CourseProfileEntity): IReference {
    return { __typename: 'Institution', id: profile.institutionId.toString() };
  }

  @ResolveField('managedLessons', () => PaginatedLessonsType)
  public getManagedLessons(@Args() _: FilterRelationDto) {
    return;
  }
}
