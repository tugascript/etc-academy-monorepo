import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@app/common/entities/gql';
import { ProfileRequestEntity } from '../profile-request.entity';

@ObjectType('PaginatedProfileRequests')
export abstract class PaginatedProfileRequestsType extends Paginated<ProfileRequestEntity>(
  ProfileRequestEntity,
) {}
