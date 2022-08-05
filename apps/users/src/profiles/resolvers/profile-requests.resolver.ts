import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfilesService } from '../profiles.service';
import { ProfileRequestEntity } from '../entities/profile-request.entity';
import { LocalMessageType } from '@app/common/entities/gql';
import { CurrentUser } from '@app/common/decorators';
import { IAccessUser, IPaginated } from '@app/common/interfaces';
import { CreateProfileInput } from '../inputs/create-profile.input';
import { RespondToProfileRequestInput } from '../inputs/respond-to-profile-request.input';
import { ProfileRequestDto } from '../dtos/profile-request.dto';
import { PaginatedProfileRequestsType } from '../entities/gql/paginated-profile-requests.type';
import { FilterProfileRequestsDto } from '../dtos/filter-profile-requests.dto';

@Resolver(() => ProfileRequestEntity)
export class ProfileRequestsResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => LocalMessageType)
  public async sendProfileRequest(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: CreateProfileInput,
  ): Promise<LocalMessageType> {
    return this.profilesService.sendProfileRequest(user.id, input);
  }

  @Mutation(() => LocalMessageType)
  public async respondToProfileRequest(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: RespondToProfileRequestInput,
  ): Promise<LocalMessageType> {
    return this.profilesService.respondToProfileRequest(user.id, input);
  }

  @Mutation(() => LocalMessageType)
  public async acceptRejectedProfileRequest(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfileRequestDto,
  ): Promise<LocalMessageType> {
    return this.profilesService.acceptRejectedProfileRequest(
      user.id,
      dto.requestId,
    );
  }

  @Query(() => PaginatedProfileRequestsType)
  public async filterProfileRequests(
    @CurrentUser() user: IAccessUser,
    @Args() dto: FilterProfileRequestsDto,
  ): Promise<IPaginated<ProfileRequestEntity>> {
    return this.profilesService.filterProfileRequests(user.id, dto);
  }
}
