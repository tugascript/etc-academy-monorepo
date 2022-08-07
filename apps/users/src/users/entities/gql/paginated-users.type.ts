import { Paginated } from 'src/common/entities/gql';
import { ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';

@ObjectType('PaginatedUsers')
export abstract class PaginatedUsersType extends Paginated(UserEntity) {}
