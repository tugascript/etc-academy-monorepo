import { Paginated } from 'src/common/entities/gql';
import { ObjectType } from '@nestjs/graphql';
import { ProfileEntity } from '../profile.entity';

@ObjectType('PaginatedProfiles')
export abstract class PaginatedProfilesType extends Paginated<ProfileEntity>(
  ProfileEntity,
) {}
