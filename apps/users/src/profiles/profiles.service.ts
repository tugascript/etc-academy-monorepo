import { Injectable } from '@nestjs/common';
import { ProfileEntity } from './entities/profile.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CommonService } from 'app/common';
import { UploaderService } from 'app/uploader';
import { ProfileRoleEnum, ProfileStatusEnum } from 'app/common/enums';
import { UsersService } from '../users/users.service';
import { InvitationEntity } from './entities/invitation.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: EntityRepository<ProfileEntity>,
    @InjectRepository(InvitationEntity)
    private readonly invitationsRepository: EntityRepository<InvitationEntity>,
    private readonly commonService: CommonService,
    private readonly uploaderService: UploaderService,
    private readonly usersService: UsersService,
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

  public async profileByRelations(
    userId: number,
    institutionId: number,
  ): Promise<ProfileEntity> {
    const profile = this.profilesRepository.findOne({
      user: userId,
      institution: institutionId,
    });
    this.commonService.checkExistence('Profile', profile);
    return profile;
  }
}
