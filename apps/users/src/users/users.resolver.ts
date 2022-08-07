import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser, Public } from '../common/decorators';
import { SearchDto } from '../common/dtos';
import { FilterRelationDto } from '../common/dtos/filter-relation.dto';
import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { PaginatedInstitutionsType } from '../institutions/entities/gql/paginated-institutions.type';
import { PaginatedProfilesType } from '../profiles/entities/gql/paginated-profiles.type';
import { EmailDto } from './dtos/email.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { ProfilePictureDto } from './dtos/profile-picture.dto';
import { UserDto } from './dtos/user.dto';
import { PaginatedUsersType } from './entities/gql/paginated-users.type';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //____________________ MUTATIONS ____________________

  @Mutation(() => UserEntity)
  public async updateUsersPicture(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ProfilePictureDto,
  ): Promise<UserEntity> {
    return this.usersService.updateProfilePicture(user.id, dto);
  }

  @Mutation(() => UserEntity)
  public async toggleTwoFactorAuth(
    @CurrentUser() user: IAccessUser,
  ): Promise<UserEntity> {
    return this.usersService.toggleTwoFactor(user.id);
  }

  @Mutation(() => UserEntity)
  public async updateEmail(
    @CurrentUser() user: IAccessUser,
    @Args() dto: EmailDto,
  ): Promise<UserEntity> {
    return this.usersService.updateEmail(user.id, dto.email);
  }

  @Mutation(() => LocalMessageType)
  public async deleteAccount(
    @CurrentUser() user: IAccessUser,
    @Args('password') password: string,
  ): Promise<LocalMessageType> {
    return this.usersService.deleteUser(user.id, password);
  }

  //____________________ QUERIES ____________________

  @Query(() => UserEntity)
  public async me(@CurrentUser() user: IAccessUser): Promise<UserEntity> {
    return this.usersService.userById(user.id);
  }

  //____________________ PUBLIC QUERIES ____________________

  @Public()
  @Query(() => UserEntity)
  public async userByUsername(@Args() dto: GetUserDto): Promise<UserEntity> {
    return this.usersService.userByUsername(dto.username);
  }

  @Public()
  @Query(() => UserEntity)
  public async userById(@Args() dto: UserDto): Promise<UserEntity> {
    return this.usersService.userById(dto.userId);
  }

  @Public()
  @Query(() => PaginatedUsersType)
  public async filterUsers(
    @Args() dto: SearchDto,
  ): Promise<IPaginated<UserEntity>> {
    return this.usersService.filterUsers(dto);
  }

  //____________________ RESOLVE FIELDS ____________________

  @ResolveField('email', () => String, { nullable: true })
  public getEmail(
    @Parent() userEntity: UserEntity,
    @CurrentUser() user: IAccessUser,
  ): string | null {
    return userEntity.id === user.id ? userEntity.email : null;
  }

  @ResolveField('profiles', () => PaginatedProfilesType)
  public getProfiles(@Args() _: FilterRelationDto) {
    return;
  }

  @ResolveField('institutions', () => PaginatedInstitutionsType)
  public getInstitutions(@Args() _: FilterRelationDto) {
    return;
  }

  // Resolved by the loaders
  @ResolveReference()
  public resolveReference(_: IReference) {
    return;
  }
}
