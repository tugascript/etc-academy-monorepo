import { ProfileStatusEnum } from '../../common/enums';
import { ProfileDto } from './profile.dto';
export declare abstract class UpdateProfileStatusDto extends ProfileDto {
    status: ProfileStatusEnum;
}
