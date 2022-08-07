import { UserEntity } from '../user.entity';
declare const PaginatedUsersType_base: import("@nestjs/common").Type<import("../../../common/interfaces").IPaginated<UserEntity>>;
export declare abstract class PaginatedUsersType extends PaginatedUsersType_base {
}
export {};
