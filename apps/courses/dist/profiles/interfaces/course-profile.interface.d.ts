import { IBase } from 'src/common/interfaces';
import { ProfileRoleEnum, ProfileStatusEnum } from '../../common/enums';
import { ICourse } from '../../courses/interfaces/course.interface';
export interface ICourseProfile extends IBase {
    slug: string;
    course: ICourse;
    role: ProfileRoleEnum;
    status: ProfileStatusEnum;
    userId: number;
    institutionProfileId: number;
    institutionId: number;
}
