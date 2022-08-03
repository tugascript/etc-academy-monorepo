import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'app/common/entities/gql';
import { UserEntity } from '../entities/user.entity';

@ObjectType('PaginatedUsers')
export abstract class PaginatedUsersType extends Paginated(UserEntity) {}
