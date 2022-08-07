import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommonService } from 'src/common';
import { LocalMessageType } from 'src/common/entities/gql';
import { ProfileRoleEnum } from 'src/common/enums';
import { ProfilesService } from '../profiles/profiles.service';
import { AddressTypeDto } from './dtos/address-type.dto';
import { AddressDto } from './dtos/address.dto';
import { AddressEntity } from './entities/address.entity';
import { AddressTypeEnum } from './enums/address-type.enum';
import { CreateAddressInput } from './inputs/create-address.input';
import { InitialAddressInput } from './inputs/initial-address.input';
import { UpdateAddressInput } from './inputs/update-address.input';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressesRepository: EntityRepository<AddressEntity>,
    private readonly commonService: CommonService,
    private readonly profilesService: ProfilesService,
  ) {}

  public async createInitialAddress(
    userId: number,
    institutionId: number,
    { address, address2, city, country, state, zipCode }: InitialAddressInput,
  ): Promise<AddressEntity> {
    const addressEntity = this.addressesRepository.create({
      address,
      address2,
      city,
      country,
      state,
      zipCode,
      addressType: AddressTypeEnum.LOCATION,
      institution: institutionId,
      author: userId,
    });
    await this.commonService.saveEntity(
      this.addressesRepository,
      addressEntity,
      true,
    );
    return addressEntity;
  }

  public async createAddress(
    userId: number,
    {
      institutionId,
      addressType,
      address,
      address2,
      city,
      country,
      state,
      zipCode,
    }: CreateAddressInput,
  ): Promise<AddressEntity> {
    await this.checkProfile(userId, institutionId);
    const addressEntity = this.addressesRepository.create({
      address,
      address2,
      city,
      country,
      state,
      zipCode,
      addressType,
      institution: institutionId,
      author: userId,
    });
    await this.commonService.saveEntity(
      this.addressesRepository,
      addressEntity,
      true,
    );
    return addressEntity;
  }

  public async updateAddress(
    userId: number,
    {
      institutionId,
      addressId,
      address,
      address2,
      city,
      zipCode,
      state,
      country,
    }: UpdateAddressInput,
  ): Promise<AddressEntity> {
    await this.checkProfile(userId, institutionId);
    const addressEntity = await this.addressById(institutionId, addressId);

    if (address) addressEntity.address = address;
    if (address2) addressEntity.address2 = address2;
    if (city) addressEntity.city = city;
    if (zipCode) addressEntity.zipCode = zipCode;
    if (state) addressEntity.state = state;
    if (country) addressEntity.country = country;

    await this.commonService.saveEntity(
      this.addressesRepository,
      addressEntity,
    );
    return addressEntity;
  }

  public async deleteAddress(
    userId: number,
    { institutionId, addressId }: AddressDto,
  ): Promise<LocalMessageType> {
    await this.checkProfile(userId, institutionId);
    const address = await this.addressById(institutionId, addressId);
    await this.commonService.removeEntity(this.addressesRepository, address);
    return new LocalMessageType('Address deleted successfully');
  }

  public async addressesByInstitution(
    institutionId: number,
  ): Promise<AddressEntity[]> {
    return this.addressesRepository.find({
      institution: institutionId,
      addressType: AddressTypeEnum.LOCATION,
    });
  }

  public async addressesByType(
    userId: number,
    { institutionId, addressType }: AddressTypeDto,
  ): Promise<AddressEntity[]> {
    await this.checkProfile(userId, institutionId);
    return this.addressesRepository.find({
      institution: institutionId,
      addressType,
    });
  }

  private async addressById(
    institutionId: number,
    addressId: number,
  ): Promise<AddressEntity> {
    const address = await this.addressesRepository.findOne({
      id: addressId,
      institution: institutionId,
    });
    this.commonService.checkExistence('Address', address);
    return address;
  }

  private async checkProfile(userId: number, institutionId: number) {
    const profile = await this.profilesService.profileByRelations(
      userId,
      institutionId,
    );
    if (profile.role !== ProfileRoleEnum.ADMIN)
      throw new UnauthorizedException('Only admins can edit addresses');
  }
}
