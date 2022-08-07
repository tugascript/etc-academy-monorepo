import { LocalMessageType } from 'src/common/entities/gql';
import { IAccessUser, IReference } from 'src/common/interfaces';
import { InstitutionDto } from '../institutions/dtos/institution.dto';
import { AddressesService } from './addresses.service';
import { AddressTypeDto } from './dtos/address-type.dto';
import { AddressDto } from './dtos/address.dto';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressInput } from './inputs/create-address.input';
import { UpdateAddressInput } from './inputs/update-address.input';
export declare class AddressesResolver {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    createAddress(user: IAccessUser, input: CreateAddressInput): Promise<AddressEntity>;
    updateAddress(user: IAccessUser, input: UpdateAddressInput): Promise<AddressEntity>;
    deleteAddress(user: IAccessUser, dto: AddressDto): Promise<LocalMessageType>;
    addressesByInstitution(dto: InstitutionDto): Promise<AddressEntity[]>;
    addressesByType(user: IAccessUser, dto: AddressTypeDto): Promise<AddressEntity[]>;
    resolveReference(_: IReference): void;
}
