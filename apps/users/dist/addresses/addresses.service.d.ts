import { EntityRepository } from '@mikro-orm/postgresql';
import { CommonService } from 'src/common';
import { LocalMessageType } from 'src/common/entities/gql';
import { ProfilesService } from '../profiles/profiles.service';
import { AddressTypeDto } from './dtos/address-type.dto';
import { AddressDto } from './dtos/address.dto';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressInput } from './inputs/create-address.input';
import { InitialAddressInput } from './inputs/initial-address.input';
import { UpdateAddressInput } from './inputs/update-address.input';
export declare class AddressesService {
    private readonly addressesRepository;
    private readonly commonService;
    private readonly profilesService;
    constructor(addressesRepository: EntityRepository<AddressEntity>, commonService: CommonService, profilesService: ProfilesService);
    createInitialAddress(userId: number, institutionId: number, { address, address2, city, country, state, zipCode }: InitialAddressInput): Promise<AddressEntity>;
    createAddress(userId: number, { institutionId, addressType, address, address2, city, country, state, zipCode, }: CreateAddressInput): Promise<AddressEntity>;
    updateAddress(userId: number, { institutionId, addressId, address, address2, city, zipCode, state, country, }: UpdateAddressInput): Promise<AddressEntity>;
    deleteAddress(userId: number, { institutionId, addressId }: AddressDto): Promise<LocalMessageType>;
    addressesByInstitution(institutionId: number): Promise<AddressEntity[]>;
    addressesByType(userId: number, { institutionId, addressType }: AddressTypeDto): Promise<AddressEntity[]>;
    private addressById;
    private checkProfile;
}
