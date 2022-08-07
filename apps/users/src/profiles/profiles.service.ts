import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { CommonService } from 'src/common';
import { LocalMessageType } from 'src/common/entities/gql';
import {
  getQueryCursor,
  ProfileRoleEnum,
  ProfileStatusEnum,
  QueryCursorEnum,
  QueryOrderEnum,
  RatioEnum,
  RequestStatusEnum,
  RequestUserEnum,
} from 'src/common/enums';
import { IId, IPaginated } from 'src/common/interfaces';
import { generateToken, verifyToken } from 'src/common/utils';
import { UploaderService } from 'src/uploader';
import { EmailService } from '../email/email.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FilterProfileRequestsDto } from './dtos/filter-profile-requests.dto';
import { FilterProfilesDto } from './dtos/filter-profiles.dto';
import { UpdateProfilePictureDto } from './dtos/update-profile-picture.dto';
import { UpdateProfileRoleDto } from './dtos/update-profile-role.dto';
import { UpdateProfileStatusDto } from './dtos/update-profile-status.dto';
import { InvitationEntity } from './entities/invitation.entity';
import { ProfileRequestEntity } from './entities/profile-request.entity';
import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileInput } from './inputs/create-profile.input';
import { RespondToInvitationInput } from './inputs/respond-to-invitation.input';
import { RespondToProfileRequestInput } from './inputs/respond-to-profile-request.input';

@Injectable()
export class ProfilesService {
  private readonly frontendUrl = this.configService.get<string>('FRONTEND_URL');
  private readonly invitationPassword = this.configService.get<string>(
    'INVITATION_JWT_PASSWORD',
  );

  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: EntityRepository<ProfileEntity>,
    @InjectRepository(InvitationEntity)
    private readonly invitationsRepository: EntityRepository<InvitationEntity>,
    @InjectRepository(ProfileRequestEntity)
    private readonly profileRequestsRepository: EntityRepository<ProfileRequestEntity>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    private readonly uploaderService: UploaderService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  public async createInitialProfile(
    userId: number,
    institutionId: number,
  ): Promise<ProfileEntity> {
    const user = await this.usersService.userById(userId);
    const profile = this.profilesRepository.create({
      institution: institutionId,
      user: userId,
      slug: this.commonService.generateSlug(user.name),
      picture: user.picture,
      role: ProfileRoleEnum.ADMIN,
      status: ProfileStatusEnum.STAFF,
    });
    await this.commonService.saveEntity(this.profilesRepository, profile, true);
    return profile;
  }

  public async updateProfilePicture(
    userId: number,
    { picture, profileId, institutionId }: UpdateProfilePictureDto,
  ): Promise<ProfileEntity> {
    const profile = await this.profileByRelations(userId, institutionId);

    if (profile.role !== ProfileRoleEnum.ADMIN)
      throw new UnauthorizedException(
        'You are not authorized to update profile pictures',
      );

    const updatedProfile = await this.profileById(institutionId, profileId);
    const oldPicture = updatedProfile.picture;
    updatedProfile.picture = await this.uploaderService.uploadImage(
      userId,
      picture,
      RatioEnum.SQUARE,
    );
    await this.commonService.saveEntity(
      this.profilesRepository,
      updatedProfile,
    );

    if (oldPicture) await this.uploaderService.deleteFile(oldPicture);

    return updatedProfile;
  }

  public async updateProfileStatus(
    userId: number,
    { status, profileId, institutionId }: UpdateProfileStatusDto,
  ): Promise<ProfileEntity> {
    const profile = await this.profileByRelations(userId, institutionId);

    if (profile.role !== ProfileRoleEnum.ADMIN)
      throw new UnauthorizedException(
        'You are not authorized to update profile status',
      );

    const updatedProfile = await this.profileById(institutionId, profileId);

    if (updatedProfile.status === status)
      throw new BadRequestException(
        `Profile status is already set to ${status.toLowerCase()}`,
      );

    updatedProfile.status = status;
    await this.commonService.saveEntity(
      this.profilesRepository,
      updatedProfile,
    );
    return updatedProfile;
  }

  public async updateProfileRole(
    userId: number,
    { role, profileId, institutionId }: UpdateProfileRoleDto,
  ): Promise<ProfileEntity> {
    const profile = await this.profileByRelations(userId, institutionId);

    if (profile.role !== ProfileRoleEnum.ADMIN)
      throw new UnauthorizedException(
        'You are not authorized to update profile roles',
      );

    const updatedProfile = await this.profileById(institutionId, profileId);

    if (updatedProfile.role === role)
      throw new BadRequestException(
        `Profile role is already set to ${role.toLowerCase()}`,
      );

    updatedProfile.role = role;
    await this.commonService.saveEntity(
      this.profilesRepository,
      updatedProfile,
    );
    return updatedProfile;
  }

  public async sendProfileRequest(
    userId: number,
    { institutionId, userEmail, role, userName, status }: CreateProfileInput,
  ): Promise<LocalMessageType> {
    const profile = await this.profileByRelations(userId, institutionId, true);

    if (
      status === ProfileStatusEnum.STAFF &&
      profile.role !== ProfileRoleEnum.ADMIN
    ) {
      throw new UnauthorizedException(
        'You are not authorized to create staff profiles',
      );
    }

    const user = await this.usersService.uncheckedUserByEmail(userEmail);

    if (!user) {
      this.checkStatusAndRole(role, status);
      const invitation = this.invitationsRepository.findOne({
        email: userEmail,
      });

      if (!invitation) {
        const newInvitation = this.invitationsRepository.create({
          email: userEmail,
          profileRole: role,
          profileStatus: status,
          institution: institutionId,
          sender: userId,
        });
        await this.commonService.saveEntity(
          this.invitationsRepository,
          newInvitation,
          true,
        );
        this.emailService.sendInvitation(
          userName,
          userEmail,
          role,
          profile.institution.name,
          profile.user.name,
          await this.generateInvitationLink(newInvitation.id),
        );

        return new LocalMessageType('Invitation sent successfully');
      }

      return new LocalMessageType('Invitation already sent');
    }

    const request = this.profileRequestsRepository.create({
      profileStatus: status,
      profileRole: role,
      institution: institutionId,
      recipient: user.id,
      sender: userId,
    });
    await this.commonService.saveEntity(
      this.profileRequestsRepository,
      request,
      true,
    );
    this.emailService.sendRequest(user, role, profile);
    return new LocalMessageType('Request sent successfully');
  }

  public async respondToInvitation(
    userId: number,
    { token, response }: RespondToInvitationInput,
  ): Promise<LocalMessageType> {
    const invitationId = await this.verifyInvitationToken(token);
    const invitation = await this.invitationById(invitationId);
    const user = await this.usersService.userById(userId);

    if (invitation.email !== user.email)
      throw new UnauthorizedException('This invitation is not for your email');
    if (invitation.status !== RequestStatusEnum.PENDING)
      throw new BadRequestException(
        'You have already responded to this invitation',
      );

    invitation.status = response;

    if (response === RequestStatusEnum.REJECTED) {
      await this.commonService.saveEntity(
        this.invitationsRepository,
        invitation,
      );
      return new LocalMessageType('Invitation rejected successfully');
    }

    await this.acceptInvitation(invitation, user);
    return new LocalMessageType('Invitation accepted successfully');
  }

  public async acceptRejectedInvitation(
    userId: number,
    invitationId: number,
  ): Promise<LocalMessageType> {
    const invitation = await this.invitationById(invitationId);
    const user = await this.usersService.userById(userId);

    if (invitation.email !== user.email)
      throw new UnauthorizedException('This invitation is not for your email');
    if (invitation.status === RequestStatusEnum.ACCEPTED)
      throw new BadRequestException('Invitation already accepted');

    invitation.status = RequestStatusEnum.ACCEPTED;
    await this.acceptInvitation(invitation, user);
    return new LocalMessageType('Invitation accepted successfully');
  }

  public async respondToProfileRequest(
    userId: number,
    { response, requestId }: RespondToProfileRequestInput,
  ): Promise<LocalMessageType> {
    const request = await this.requestById(userId, requestId, true);

    if (request.recipient.id !== userId)
      throw new BadRequestException(
        "You sent this request, you didn't receive it",
      );
    if (request.status !== RequestStatusEnum.PENDING)
      throw new BadRequestException(
        'You have already responded to this request',
      );

    request.status = response;

    if (response === RequestStatusEnum.REJECTED) {
      await this.commonService.saveEntity(
        this.profileRequestsRepository,
        request,
      );
      return new LocalMessageType('Request rejected successfully');
    }

    await this.acceptRequest(request);
    return new LocalMessageType('Request accepted successfully');
  }

  public async acceptRejectedProfileRequest(
    userId: number,
    requestId: number,
  ): Promise<LocalMessageType> {
    const request = await this.requestById(userId, requestId, true);

    if (request.recipient.id !== userId)
      throw new BadRequestException(
        "You sent this request, you didn't receive it",
      );
    if (request.status === RequestStatusEnum.ACCEPTED)
      throw new BadRequestException('Request already accepted');

    request.status = RequestStatusEnum.ACCEPTED;
    await this.acceptRequest(request);
    return new LocalMessageType('Request accepted successfully');
  }

  public async invitationByToken(token: string): Promise<InvitationEntity> {
    const id = await this.verifyInvitationToken(token);
    const invitation = await this.invitationById(id);
    return invitation;
  }

  public async filterProfileRequests(
    userId: number,
    { status, userType, first, after }: FilterProfileRequestsDto,
  ): Promise<IPaginated<ProfileRequestEntity>> {
    const qb = this.profileRequestsRepository.createQueryBuilder('pr').where(
      userType === RequestUserEnum.RECIPIENT
        ? {
            recipient: userId,
          }
        : { sender: userId },
    );

    if (status) qb.andWhere({ status });

    return this.commonService.queryBuilderPagination(
      'pr',
      'id',
      first,
      QueryOrderEnum.DESC,
      qb,
      after,
      true,
    );
  }

  public async profileById(
    institutionId: number,
    profileId: number,
  ): Promise<ProfileEntity> {
    const profile = await this.profilesRepository.findOne({
      id: profileId,
      institution: institutionId,
    });
    this.commonService.checkExistence('Profile', profile);
    return profile;
  }

  public async profileBySlug(
    institutionId: number,
    slug: string,
  ): Promise<ProfileEntity> {
    const profile = await this.profilesRepository.findOne({
      institution: institutionId,
      slug,
    });
    this.commonService.checkExistence('Profile', profile);
    return profile;
  }

  public async profileByRelations(
    userId: number,
    institutionId: number,
    populate = false,
  ): Promise<ProfileEntity> {
    const profile = this.profilesRepository.findOne(
      {
        user: userId,
        institution: institutionId,
      },
      populate
        ? {
            populate: ['institution', 'user'],
          }
        : undefined,
    );
    this.commonService.checkExistence('Profile', profile);
    return profile;
  }

  public async checkProfileExistence(
    userId: number,
    institutionId: number,
  ): Promise<void> {
    const count = await this.profilesRepository.count({
      user: userId,
      institution: institutionId,
    });

    if (count === 0)
      throw new UnauthorizedException(
        'Only members of an institution can see its profiles',
      );
  }

  public async filterProfiles(
    userId: number,
    { institutionId, search, order, cursor, first, after }: FilterProfilesDto,
  ): Promise<IPaginated<ProfileEntity>> {
    await this.checkProfileExistence(userId, institutionId);

    const qb = this.profilesRepository.createQueryBuilder('p').where({
      institution: institutionId,
    });

    if (search) {
      qb.leftJoin('p.user', 'u').andWhere({
        user: {
          name: {
            $iLike: this.commonService.formatSearch(search),
          },
        },
      });
    }

    return this.commonService.queryBuilderPagination(
      'p',
      getQueryCursor(cursor) as keyof ProfileEntity,
      first,
      order,
      qb,
      after,
      cursor === QueryCursorEnum.DATE,
    );
  }

  public async userProfiles(userId: number): Promise<ProfileEntity[]> {
    return this.profilesRepository.find(
      {
        user: userId,
      },
      {
        populate: ['user'],
      },
    );
  }

  public async userProfileById(profileId: number): Promise<ProfileEntity> {
    const profile = await this.profilesRepository.findOne(
      {
        id: profileId,
      },
      {
        populate: ['user'],
      },
    );
    if (!profile) throw new RpcException('Profile not found');
    return profile;
  }

  public async requestById(
    userId: number,
    requestId: number,
    populate = false,
  ): Promise<ProfileRequestEntity> {
    const request = await this.profileRequestsRepository.findOne(
      {
        id: requestId,
      },
      populate ? { populate: ['recipient'] } : undefined,
    );
    this.commonService.checkExistence('Request', request);

    if (request.sender.id !== userId || request.recipient.id !== userId)
      throw new NotFoundException('Request not found');

    return request;
  }

  public async invitationsByUser(
    userId: number,
    status: RequestStatusEnum,
  ): Promise<InvitationEntity[]> {
    const user = await this.usersService.userById(userId);
    return await this.invitationsRepository.find({
      status,
      email: user.email,
    });
  }

  private async invitationById(
    invitationId: number,
  ): Promise<InvitationEntity> {
    const invitation = await this.invitationsRepository.findOne({
      id: invitationId,
    });
    this.commonService.checkExistence('Invitation', invitation);
    return invitation;
  }

  private async acceptInvitation(
    invitation: InvitationEntity,
    user: UserEntity,
  ): Promise<void> {
    const { profileStatus, profileRole, institution } = invitation;
    const profile = this.profilesRepository.create({
      institution,
      status: profileStatus,
      role: profileRole,
      user: user,
      picture: user.picture,
      slug: this.commonService.generateSlug(user.name),
    });
    await this.commonService.saveEntity(this.profilesRepository, profile, true);
  }

  private async acceptRequest(request: ProfileRequestEntity): Promise<void> {
    const { profileStatus, profileRole, institution } = request;
    const profile = this.profilesRepository.create({
      institution,
      status: profileStatus,
      role: profileRole,
      user: request.recipient,
      picture: request.recipient.picture,
      slug: this.commonService.generateSlug(request.recipient.name),
    });
    await this.commonService.saveEntity(this.profilesRepository, profile, true);
  }

  private checkStatusAndRole(
    role: ProfileRoleEnum,
    status: ProfileStatusEnum,
  ): void {
    switch (role) {
      case ProfileRoleEnum.ADMIN:
      case ProfileRoleEnum.STAFF:
      case ProfileRoleEnum.TEACHER:
        if (status !== ProfileStatusEnum.STAFF)
          throw new BadRequestException('Invalid status');
        break;
      case ProfileRoleEnum.STUDENT:
        if (status === ProfileStatusEnum.STAFF)
          throw new BadRequestException('Invalid status');
        break;
    }
  }

  private async generateInvitationLink(invitationId: number): Promise<string> {
    const token = await generateToken<IId>(
      { id: invitationId },
      this.invitationPassword,
      0,
      'HS256',
    );
    return `${this.frontendUrl}/invitation/${token}`;
  }

  private async verifyInvitationToken(token: string): Promise<number> {
    const { id } = await verifyToken<IId>(token, this.invitationPassword, [
      'HS256',
    ]);
    return id;
  }
}
