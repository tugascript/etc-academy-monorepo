import { Collection } from '@mikro-orm/core';
import { AddressEntity } from '../../addresses/entities/address.entity';
import { LocalBaseEntity } from '../../common/entities';
import { ProfileEntity } from '../../profiles/entities/profile.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';
import { IInstitution } from '../interfaces/institution.interface';
export declare class InstitutionEntity extends LocalBaseEntity implements IInstitution {
    name: string;
    institutionType: InstitutionTypeEnum;
    slug: string;
    picture: string;
    description?: string;
    vatNumber: string;
    owner: UserEntity;
    addresses: Collection<AddressEntity, InstitutionEntity>;
    profiles: Collection<ProfileEntity, InstitutionEntity>;
}
