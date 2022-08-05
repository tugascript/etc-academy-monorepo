import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { ProfilesService } from '../profiles.service';
import { ProfileEntity } from '../entities/profile.entity';
import { CurrentUser } from '@app/common/decorators';
import { IAccessUser, IPaginated } from '@app/common/interfaces';
import { UpdateProfilePictureDto } from '../dtos/update-profile-picture.dto';
import { UpdateProfileStatusDto } from '../dtos/update-profile-status.dto';
import { UpdateProfileRoleDto } from '../dtos/update-profile-role.dto';
import { ProfileDto } from '../dtos/profile.dto';
import { ProfileSlugDto } from '../dtos/profile-slug.dto';
import { ProfileRelationsDto } from '../dtos/profile-relations.dto';
import { PaginatedProfilesType } from '../entities/gql/paginated-profiles.type';
import { FilterProfilesDto } from '../dtos/filter-profiles.dto';

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
  public resolveReference(_: unknown) {
    return;
  }
}
