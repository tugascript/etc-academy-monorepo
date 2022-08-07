import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/entities/gql';
import { InstitutionEntity } from './institution.entity';

@ObjectType('PaginatedInstitutions')
export abstract class PaginatedInstitutionsType extends Paginated<InstitutionEntity>(
  InstitutionEntity,
) {}
