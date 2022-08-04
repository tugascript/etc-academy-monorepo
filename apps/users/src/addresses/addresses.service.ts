import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommonService } from 'app/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateAddressInput } from './inputs/create-address.input';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileRoleEnum } from 'app/common/enums';
import { InitialAddressInput } from './inputs/initial-address.input';
import { AddressTypeEnum } from './enums/address-type.enum';

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

  private async checkProfile(userId: number, institutionId: number) {
    const profile = await this.profilesService.profileByRelations(
      userId,
      institutionId,
    );
    if (profile.role !== ProfileRoleEnum.ADMIN)
      throw new UnauthorizedException('Only admins can edit addresses');
  }
}
