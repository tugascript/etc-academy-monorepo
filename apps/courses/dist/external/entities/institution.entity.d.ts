import { LocalBaseType } from '../../common/entities/gql';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';
import { UserEntity } from './user.entity';
export declare class InstitutionEntity extends LocalBaseType {
    name: string;
    institutionType: InstitutionTypeEnum;
    slug: string;
    picture: string;
    description?: string;
    vatNumber: string;
    owner: UserEntity;
}
