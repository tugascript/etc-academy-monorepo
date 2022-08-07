import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/entities/gql';
import { ProfileEntity } from './institution-profile.entity';

@ObjectType('PaginatedProfiles')
export abstract class PaginatedProfilesType extends Paginated<ProfileEntity>(
  ProfileEntity,
) {}
