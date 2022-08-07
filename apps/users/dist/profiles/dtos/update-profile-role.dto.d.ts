import { ProfileRoleEnum } from 'src/common/enums';
import { ProfileDto } from './profile.dto';
export declare abstract class UpdateProfileRoleDto extends ProfileDto {
    role: ProfileRoleEnum;
}
