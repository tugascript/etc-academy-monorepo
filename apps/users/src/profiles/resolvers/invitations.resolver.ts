import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfilesService } from '../profiles.service';
import { InvitationEntity } from '../entities/invitation.entity';
import { LocalMessageType } from '@app/common/entities/gql';
import { RespondToInvitationInput } from '../inputs/respond-to-invitation.input';
import { IAccessUser } from '@app/common/interfaces';
import { CurrentUser, Public } from '@app/common/decorators';
import { InvitationDto } from '../dtos/invitation.dto';
import { TokenDto } from '@app/common/dtos';
import { GetInvitationsDto } from '../dtos/get-invitations.dto';

@Resolver(() => InvitationEntity)
export class InvitationsResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => LocalMessageType)
  public async respondToInvitation(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: RespondToInvitationInput,
  ): Promise<LocalMessageType> {
    return this.profilesService.respondToInvitation(user.id, input);
  }

  @Mutation(() => LocalMessageType)
  public async acceptRejectedInvitation(
    @CurrentUser() user: IAccessUser,
    @Args() dto: InvitationDto,
  ): Promise<LocalMessageType> {
    return this.profilesService.acceptRejectedInvitation(
      user.id,
      dto.invitationId,
    );
  }

  @Public()
  @Query(() => InvitationEntity)
  public async invitationByToken(
    @Args() dto: TokenDto,
  ): Promise<InvitationEntity> {
    return this.profilesService.invitationByToken(dto.token);
  }

  @Query(() => [InvitationEntity])
  public async invitationsByUser(
    @CurrentUser() user: IAccessUser,
    @Args() dto: GetInvitationsDto,
  ): Promise<InvitationEntity[]> {
    return this.profilesService.invitationsByUser(user.id, dto.status);
  }
}
