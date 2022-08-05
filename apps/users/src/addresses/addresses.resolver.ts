import { CurrentUser } from '@app/common/decorators';
import { IAccessUser } from '@app/common/interfaces';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocalMessageType } from 'app/common/entities/gql';
import { InstitutionDto } from '../institutions/dtos/institution.dto';
import { AddressesService } from './addresses.service';
import { AddressTypeDto } from './dtos/address-type.dto';
import { AddressDto } from './dtos/address.dto';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressInput } from './inputs/create-address.input';
import { UpdateAddressInput } from './inputs/update-address.input';

@Resolver(() => AddressEntity)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation(() => AddressEntity)
  public async createAddress(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: CreateAddressInput,
  ): Promise<AddressEntity> {
    return this.addressesService.createAddress(user.id, input);
  }

  @Mutation(() => AddressEntity)
  public async updateAddress(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: UpdateAddressInput,
  ): Promise<AddressEntity> {
    return this.addressesService.updateAddress(user.id, input);
  }

  @Mutation(() => LocalMessageType)
  public async deleteAddress(
    @CurrentUser() user: IAccessUser,
    @Args() dto: AddressDto,
  ): Promise<LocalMessageType> {
    return this.addressesService.deleteAddress(user.id, dto);
  }

  @Query(() => [AddressEntity])
  public async addressesByInstitution(
    @Args() dto: InstitutionDto,
  ): Promise<AddressEntity[]> {
    return this.addressesService.addressesByInstitution(dto.institutionId);
  }

  @Query(() => [AddressEntity])
  public async addressesByType(
    @CurrentUser() user: IAccessUser,
    @Args() dto: AddressTypeDto,
  ): Promise<AddressEntity[]> {
    return this.addressesService.addressesByType(user.id, dto);
  }
}
