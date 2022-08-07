import { IMessageProfile, IRedisMessage } from 'src/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { UserProfileDto } from './dtos/user-profile.dto';
import { UserProfilesDto } from './dtos/user-profiles.dto';
import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    private readonly configService;
    private readonly authUUID;
    private readonly coursesUUID;
    constructor(profilesService: ProfilesService, configService: ConfigService);
    getUserProfiles(dto: UserProfilesDto): Promise<IRedisMessage<IMessageProfile[]>>;
    getProfileById(dto: UserProfileDto): Promise<IRedisMessage<IMessageProfile>>;
    private transformProfiles;
    private transformProfile;
}
