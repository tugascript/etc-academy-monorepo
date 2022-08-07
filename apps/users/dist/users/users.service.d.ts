import { EntityRepository } from '@mikro-orm/postgresql';
import { CommonService } from '../common';
import { SearchDto } from '../common/dtos';
import { LocalMessageType } from '../common/entities/gql';
import { IPaginated } from '../common/interfaces';
import { UploaderService } from '../uploader';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { LoginDto } from './dtos/login.dto';
import { ProfilePictureDto } from './dtos/profile-picture.dto';
import { RegisterDto } from './dtos/register.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserPayloadDto } from './dtos/user-payload.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    private readonly commonService;
    private readonly uploaderService;
    constructor(usersRepository: EntityRepository<UserEntity>, commonService: CommonService, uploaderService: UploaderService);
    createUser({ name, email, password1, password2, }: RegisterDto): Promise<UserEntity>;
    confirmUser({ userId, count, }: UserPayloadDto): Promise<UserEntity>;
    loginUser({ email, password }: LoginDto): Promise<UserEntity>;
    changePassword({ userId, count, password1, password2, }: ChangePasswordDto): Promise<UserEntity>;
    updatePassword({ userId, password, password1, password2, }: UpdatePasswordDto): Promise<UserEntity>;
    updateProfilePicture(userId: number, { picture }: ProfilePictureDto): Promise<UserEntity>;
    deleteUser(userId: number, password: string): Promise<LocalMessageType>;
    updateEmail(userId: number, email: string): Promise<UserEntity>;
    toggleTwoFactor(userId: number): Promise<UserEntity>;
    uncheckUserById(id: number): Promise<UserEntity | undefined | null>;
    uncheckedUserByEmail(email: string): Promise<UserEntity | undefined | null>;
    userByIdForAuth(id: number): Promise<UserEntity>;
    userByEmailForAuth(email: string): Promise<UserEntity>;
    userByPayload(userId: number, count: number): Promise<UserEntity>;
    userById(id: number): Promise<UserEntity>;
    userByUsername(username: string): Promise<UserEntity>;
    filterUsers({ search, order, cursor, first, after, }: SearchDto): Promise<IPaginated<UserEntity>>;
    private saveUserToDb;
    private changeUserPassword;
}
