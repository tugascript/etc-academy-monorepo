import { RedisMessageDto } from 'src/common/dtos';
import { IMessageProfile, IRedisMessage } from 'src/common/interfaces';
import { Controller, UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from '../users/filters/exception.filter';
import { UserProfileDto } from './dtos/user-profile.dto';
import { UserProfilesDto } from './dtos/user-profiles.dto';
import { ProfileEntity } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@UseFilters(new ExceptionFilter())
@Controller()
export class ProfilesController {
  private readonly authUUID = this.configService.get<string>('AUTH_UUID');
  private readonly coursesUUID = this.configService.get<string>('COURSES_UUID');

  constructor(
    private readonly profilesService: ProfilesService,
    private readonly configService: ConfigService,
  ) {}

  @MessagePattern({ cmd: 'USER_PROFILES' })
  public async getUserProfiles(
    dto: UserProfilesDto,
  ): Promise<IRedisMessage<IMessageProfile[]>> {
    if (dto.apiId !== this.authUUID) throw new RpcException('Unauthorized');

    const profiles = await this.profilesService.userProfiles(dto.userId);
    return new RedisMessageDto(this.transformProfiles(profiles));
  }

  @MessagePattern({ cmd: 'USER_PROFILE_BY_ID' })
  public async getProfileById(
    dto: UserProfileDto,
  ): Promise<IRedisMessage<IMessageProfile>> {
    if (dto.apiId !== this.coursesUUID) throw new RpcException('Unauthorized');

    const profile = await this.profilesService.userProfileById(dto.profileId);
    return new RedisMessageDto(this.transformProfile(profile));
  }

  private transformProfiles(profiles: ProfileEntity[]): IMessageProfile[] {
    const accessProfiles: IMessageProfile[] = [];

    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i];
      accessProfiles.push(this.transformProfile(profile));
    }

    return accessProfiles;
  }

  private transformProfile(profile: ProfileEntity): IMessageProfile {
    return {
      userName: profile.user.name,
      userId: profile.user.id,
      institutionId: profile.institution.id,
      profileId: profile.id,
      role: profile.role,
      status: profile.status,
    };
  }
}
