import { CurrentUser } from 'src/common/decorators';
import { IAccessUser, IPaginated, IReference } from 'src/common/interfaces';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { FilterProfilesDto } from '../dtos/filter-profiles.dto';
import { ProfileRelationsDto } from '../dtos/profile-relations.dto';
import { ProfileSlugDto } from '../dtos/profile-slug.dto';
import { ProfileDto } from '../dtos/profile.dto';
import { UpdateProfilePictureDto } from '../dtos/update-profile-picture.dto';
import { UpdateProfileRoleDto } from '../dtos/update-profile-role.dto';
import { UpdateProfileStatusDto } from '../dtos/update-profile-status.dto';
import { PaginatedProfilesType } from '../entities/gql/paginated-profiles.type';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfilesService } from '../profiles.service';

@Resolver(() => ProfileEntity)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => ProfileEntity)
  public async updateProfilePicture(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateProfilePictureDto,
  ): Promise<ProfileEntity> {
    return this.profilesService.updateProfilePicture(user.id, dto);
  }

  @Mutation(() => ProfileEntity)
  public async updateProfileStatus(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateProfileStatusDto,
  ): Promise<ProfileEntity> {
    return this.profilesService.updateProfileStatus(user.id, dto);
  }

  @Mutation(() => ProfileEntity)
  public async updateProfileRole(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateProfileRoleDto,
  ): Promise<ProfileEntity> {
    return this.profilesService.updateProfileRole(user.id, dto);
  }

  @Query(() => ProfileEntity)
  public async profileById(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfileDto,
  ): Promise<ProfileEntity> {
    await this.profilesService.checkProfileExistence(
      user.id,
      dto.institutionId,
    );
    return this.profilesService.profileById(dto.institutionId, dto.profileId);
  }

  @Query(() => ProfileEntity)
  public async profileBySlug(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfileSlugDto,
  ): Promise<ProfileEntity> {
    await this.profilesService.checkProfileExistence(
      user.id,
      dto.institutionId,
    );
    return this.profilesService.profileBySlug(dto.institutionId, dto.slug);
  }

  @Query(() => ProfileEntity)
  public async profileByRelations(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfileRelationsDto,
  ): Promise<ProfileEntity> {
    await this.profilesService.checkProfileExistence(
      user.id,
      dto.institutionId,
    );
    return this.profilesService.profileByRelations(
      dto.userId,
      dto.institutionId,
    );
  }

  @Query(() => PaginatedProfilesType)
  public async filterProfiles(
    @CurrentUser() user: IAccessUser,
    @Args() dto: FilterProfilesDto,
  ): Promise<IPaginated<ProfileEntity>> {
    return this.profilesService.filterProfiles(user.id, dto);
  }

  @ResolveReference()
  public resolveReference(_: IReference) {
    return;
  }
}
