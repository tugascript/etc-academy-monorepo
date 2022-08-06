import { CurrentUser, Public } from '@app/common/decorators';
import { TokenDto } from '@app/common/dtos';
import { LocalMessageType } from '@app/common/entities/gql';
import { IAccessUser } from '@app/common/interfaces';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GetInvitationsDto } from '../dtos/get-invitations.dto';
import { InvitationDto } from '../dtos/invitation.dto';
import { InvitationEntity } from '../entities/invitation.entity';
import { RespondToInvitationInput } from '../inputs/respond-to-invitation.input';
import { ProfilesService } from '../profiles.service';

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

  @ResolveReference()
  public resolveReference(_: unknown) {
    return;
  }
}
