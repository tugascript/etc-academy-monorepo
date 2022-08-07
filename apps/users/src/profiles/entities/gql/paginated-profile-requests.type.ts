import { Paginated } from 'src/common/entities/gql';
import { ObjectType } from '@nestjs/graphql';
import { ProfileRequestEntity } from '../profile-request.entity';

@ObjectType('PaginatedProfileRequests')
export abstract class PaginatedProfileRequestsType extends Paginated<ProfileRequestEntity>(
  ProfileRequestEntity,
) {}
