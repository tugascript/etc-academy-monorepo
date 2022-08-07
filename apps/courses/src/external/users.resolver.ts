import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { FilterRelationDto } from '../common/dtos';
import { PaginatedInstitutionsType } from './entities/gql/paginated-institutions.type';
import { PaginatedProfilesType } from './entities/gql/paginated-profiles.type';
import { UserEntity } from './entities/user.entity';

@Resolver(() => UserEntity)
export class UsersResolver {
  @ResolveField('institutions', () => PaginatedInstitutionsType)
  public async getInstitutions(@Args() _: FilterRelationDto) {
    return;
  }

  @ResolveField('profiles', () => PaginatedProfilesType)
  public async getProfiles(@Args() _: FilterRelationDto) {
    return;
  }
}
