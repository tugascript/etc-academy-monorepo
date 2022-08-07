import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { FilterRelationDto } from '../common/dtos';
import { AddressEntity } from './entities/address.entity';
import { PaginatedProfilesType } from './entities/gql/paginated-profiles.type';
import { InstitutionEntity } from './entities/institution.entity';

@Resolver(() => InstitutionEntity)
export class InstitutionsResolver {
  @ResolveField('profiles', () => PaginatedProfilesType)
  public getProfiles(@Args() _: FilterRelationDto) {
    return;
  }

  @ResolveField('addresses', () => [AddressEntity])
  public getAddresses() {}
}
