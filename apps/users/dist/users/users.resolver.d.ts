import { SearchDto } from '../common/dtos';
import { FilterRelationDto } from '../common/dtos/filter-relation.dto';
import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { EmailDto } from './dtos/email.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { ProfilePictureDto } from './dtos/profile-picture.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateUsersPicture(user: IAccessUser, dto: ProfilePictureDto): Promise<UserEntity>;
    toggleTwoFactorAuth(user: IAccessUser): Promise<UserEntity>;
    updateEmail(user: IAccessUser, dto: EmailDto): Promise<UserEntity>;
    deleteAccount(user: IAccessUser, password: string): Promise<LocalMessageType>;
    me(user: IAccessUser): Promise<UserEntity>;
    userByUsername(dto: GetUserDto): Promise<UserEntity>;
    userById(dto: UserDto): Promise<UserEntity>;
    filterUsers(dto: SearchDto): Promise<IPaginated<UserEntity>>;
    getEmail(userEntity: UserEntity, user: IAccessUser): string | null;
    getProfiles(_: FilterRelationDto): void;
    getInstitutions(_: FilterRelationDto): void;
    resolveReference(_: IReference): void;
}
