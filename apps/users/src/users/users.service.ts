import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { ProfilePictureDto } from './dtos/profile-picture.dto';
import { UserEntity } from './entities/user.entity';
import { CommonService } from 'app/common';
import { getUserQueryCursor, RatioEnum } from 'app/common/enums';
import { SearchDto } from 'app/common/dtos';
import { IPaginated } from 'app/common/interfaces';
import { LocalMessageType } from 'app/common/entities/gql';
import { UploaderService } from 'app/uploader';
import { RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dtos/register.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { LoginDto } from './dtos/login.dto';
import { UserPayloadDto } from './dtos/user-payload.dto';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: EntityRepository<UserEntity>,
    private readonly commonService: CommonService,
    private readonly uploaderService: UploaderService,
  ) {}

  //____________________ MUTATIONS ____________________

  /**
   * Create User
   *
   * Creates a new user and saves him in db
   */
  public async createUser({
    name,
    email,
    password1,
    password2,
  }: RegisterDto): Promise<UserEntity> {
    if (password1 !== password2)
      throw new BadRequestException('Passwords do not match');

    name = this.commonService.formatTitle(name);
    const password = await hash(password1, 10);
    let username = this.commonService.generatePointSlug(name);

    if (username.length >= 3) {
      const count = await this.usersRepository.count({
        username: { $like: `${username}%` },
      });
      if (count > 0) username += count.toString();
    } else {
      username = uuidV4();
    }

    const user = this.usersRepository.create({
      name,
      username,
      email,
      password,
    });

    await this.saveUserToDb(user, true);
    return user;
  }

  public async confirmUser({
    userId,
    count,
  }: UserPayloadDto): Promise<UserEntity> {
    const user = await this.userByIdForAuth(userId);

    if (user.credentials.version !== count)
      throw new RpcException('Invalid credential version');
    if (user.confirmed) throw new RpcException('User already confirmed');

    user.confirmed = true;
    user.lastLogin = new Date();
    user.credentials.updateVersion();
    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async loginUser({ email, password }: LoginDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) throw new RpcException('Invalid Credentials');

    const currentPassword = user.password;
    const lastPassword = user.credentials.lastPassword;
    const now = dayjs();
    const time = dayjs.unix(user.credentials.updatedAt);
    const months = now.diff(time, 'month');

    if (!(await compare(password, currentPassword))) {
      // To check for passwords changes, based on facebook auth
      if (lastPassword.length > 0 && !(await compare(password, lastPassword))) {
        let message = 'You changed your password ';

        if (months > 0) {
          message += months + ' months ago.';
        } else {
          const days = now.diff(time, 'day');

          if (days > 0) {
            message += days + ' days ago.';
          } else {
            const hours = now.diff(time, 'hour');

            if (hours > 0) {
              message += hours + ' hours ago.';
            } else {
              message += 'recently.';
            }
          }
        }

        throw new RpcException(message);
      }

      throw new RpcException('Invalid credentials');
    }

    if (!user.twoFactor) {
      user.lastLogin = new Date();
      await this.saveUserToDb(user);
    }

    return user;
  }

  public async changePassword({
    userId,
    count,
    password1,
    password2,
  }: ChangePasswordDto): Promise<UserEntity> {
    const user = await this.uncheckUserById(userId);

    if (!user || user.credentials.version !== count)
      throw new RpcException('Invalid user access');

    if (password1 !== password2)
      throw new RpcException('Passwords do not match');

    await this.changeUserPassword(user, password1);
    return user;
  }

  public async updatePassword({
    userId,
    password,
    password1,
    password2,
  }: UpdatePasswordDto): Promise<UserEntity> {
    if (password1 !== password2)
      throw new RpcException('Passwords do not match');

    const user = await this.userByIdForAuth(userId);

    if (!(await compare(password, user.password)))
      throw new RpcException('Invalid password');

    await this.changeUserPassword(user, password1);
    return user;
  }

  /**
   * Update Profile Picture
   *
   * Updates the current user profile picture and deletes
   * the old one if it exits
   */
  public async updateProfilePicture(
    userId: number,
    { picture }: ProfilePictureDto,
  ): Promise<UserEntity> {
    const user = await this.userById(userId);
    const toDelete = user.picture;

    user.picture = await this.uploaderService.uploadImage(
      userId,
      picture,
      RatioEnum.SQUARE,
    );

    if (toDelete) await this.uploaderService.deleteFile(toDelete);

    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  /**
   * Delete User
   *
   * Deletes current user account
   */
  public async deleteUser(
    userId: number,
    password: string,
  ): Promise<LocalMessageType> {
    const user = await this.userById(userId);

    if (password.length > 1 && !(await compare(password, user.password)))
      throw new BadRequestException('Wrong password!');

    await this.commonService.removeEntity(this.usersRepository, user);
    return new LocalMessageType('Account deleted successfully');
  }

  public async updateEmail(userId: number, email: string): Promise<UserEntity> {
    const user = await this.userById(userId);
    user.email = email;
    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  public async toggleTwoFactor(userId: number): Promise<UserEntity> {
    const user = await this.userById(userId);
    user.twoFactor = !user.twoFactor;
    await this.commonService.saveEntity(this.usersRepository, user);
    return user;
  }

  //____________________ QUERIES ____________________

  /**
   * Get Uncheck User by ID
   *
   * Gets a user by id and does not check if it exists
   */
  public async uncheckUserById(
    id: number,
  ): Promise<UserEntity | undefined | null> {
    return this.usersRepository.findOne({ id });
  }

  public async userByIdForAuth(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new RpcException('Invalid credentials');
    return user;
  }

  public async userByEmailForAuth(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) throw new RpcException('Invalid credentials');
    return user;
  }

  public async userByPayload(
    userId: number,
    count: number,
  ): Promise<UserEntity> {
    const user = await this.userByIdForAuth(userId);

    if (user.credentials.version !== count)
      throw new RpcException('Invalid credentials');

    return user;
  }

  /**
   * Get User By ID
   *
   * Gets user by id, usually the current logged-in user
   */
  public async userById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ id });
    this.commonService.checkExistence('User', user);
    return user;
  }

  /**
   * User By Username
   *
   * Gets user by username, usually for the profile (if it exists)
   */
  public async userByUsername(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ username });
    this.commonService.checkExistence('User', user);
    return user;
  }

  /**
   * Find Users
   *
   * Search users usernames and returns paginated results
   */
  public async filterUsers({
    search,
    order,
    cursor,
    first,
    after,
  }: SearchDto): Promise<IPaginated<UserEntity>> {
    const name = 'u';

    const qb = this.usersRepository.createQueryBuilder(name).where({
      confirmed: true,
    });

    if (search) {
      qb.andWhere({
        name: {
          $ilike: this.commonService.formatSearch(search),
        },
      });
    }

    return await this.commonService.queryBuilderPagination(
      name,
      getUserQueryCursor(cursor) as keyof UserEntity,
      first,
      order,
      qb,
      after,
    );
  }

  //____________________ OTHER ____________________

  /**
   * Save User To Database
   *
   * Inserts or updates user in the database.
   * This method exists because saving the user has
   * to be shared with the auth service.
   */
  private async saveUserToDb(user: UserEntity, isNew = false): Promise<void> {
    if (isNew) this.usersRepository.persist(user);

    try {
      await this.usersRepository.flush();
    } catch (e) {
      if (e.code === '23505') throw new RpcException('Email already exists');

      throw new RpcException(e.message ?? 'Something went wrong');
    }
  }

  private async changeUserPassword(
    user: UserEntity,
    password: string,
  ): Promise<void> {
    const oldPassword = user.password;
    user.password = await hash(password, 10);
    user.credentials.updatePassword(oldPassword);
    await this.saveUserToDb(user);
  }
}
