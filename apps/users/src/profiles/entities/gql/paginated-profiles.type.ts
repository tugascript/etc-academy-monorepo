import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'app/common/entities/gql';
import { ProfileEntity } from '../profile.entity';

@ObjectType('PaginatedProfiles')
export abstract class PaginatedProfilesType extends Paginated<ProfileEntity>(
  ProfileEntity,
) {}
