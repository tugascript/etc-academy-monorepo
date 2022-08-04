import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { InstitutionsService } from './institutions.service';
import { InstitutionEntity } from './entities/institution.entity';
import { CurrentUser, Public } from 'app/common/decorators';
import { IAccessUser, IPaginated } from 'app/common/interfaces';
import { CreateInstitutionInput } from './inputs/create-institution.input';
import { UpdateInstitutionNameDto } from './dtos/update-institution-name.dto';
import { UpdateInstitutionDescriptionDto } from './dtos/update-institution-description.dto';
import { UpdateInstitutionPictureDto } from './dtos/update-institution-picture.dto';
import { LocalMessageType } from 'app/common/entities/gql';
import { InstitutionDto } from './dtos/institution.dto';
import { SearchDto, SlugDto } from 'app/common/dtos';
import { PaginatedInstitutionsType } from './entities/gql/paginated-institutions.type';
import { SearchInstitutionsDto } from './dtos/search-institutions.dto';
import { UserEntity } from '../users/entities/user.entity';
import { AddressEntity } from '../addresses/entities/address.entity';
import { PaginatedProfilesType } from '../profiles/entities/gql/paginated-profiles.type';
import { FilterRelationDto } from 'app/common/dtos/filter-relation.dto';

@Resolver(() => InstitutionEntity)
export class InstitutionsResolver {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Mutation(() => InstitutionEntity)
  public async createInstitution(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: CreateInstitutionInput,
  ): Promise<InstitutionEntity> {
    return this.institutionsService.createInstitution(user.id, input);
  }

  @Mutation(() => InstitutionEntity)
  public async updateInstitutionName(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateInstitutionNameDto,
  ): Promise<InstitutionEntity> {
    return this.institutionsService.updateInstitutionName(user.id, dto);
  }

  @Mutation(() => InstitutionEntity)
  public async updateInstitutionDescription(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateInstitutionDescriptionDto,
  ): Promise<InstitutionEntity> {
    return this.institutionsService.updateInstitutionDescription(user.id, dto);
  }

  @Mutation(() => InstitutionEntity)
  public async updateInstitutionPicture(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateInstitutionPictureDto,
  ): Promise<InstitutionEntity> {
    return this.institutionsService.updateInstitutionPicture(user.id, dto);
  }

  @Mutation(() => LocalMessageType)
  public async deleteInstitution(
    @CurrentUser() user: IAccessUser,
    @Args() dto: InstitutionDto,
  ): Promise<LocalMessageType> {
    return this.institutionsService.deleteInstitution(
      user.id,
      dto.institutionId,
    );
  }

  @Public()
  @Query(() => InstitutionEntity)
  public async institutionById(
    @Args() dto: InstitutionDto,
  ): Promise<InstitutionEntity> {
    return this.institutionsService.institutionById(dto.institutionId);
  }

  @Public()
  @Query(() => InstitutionEntity)
  public async institutionBySlug(
    @Args() dto: SlugDto,
  ): Promise<InstitutionEntity> {
    return this.institutionsService.institutionBySlug(dto.slug);
  }

  @Public()
  @Query(() => PaginatedInstitutionsType)
  public async searchInstitutions(
    @Args() dto: SearchInstitutionsDto,
  ): Promise<IPaginated<InstitutionEntity>> {
    return this.institutionsService.searchInstitutions(dto);
  }

  @Query(() => [InstitutionEntity])
  public async ownersInstitutions(
    @CurrentUser() user: IAccessUser,
  ): Promise<InstitutionEntity[]> {
    return this.institutionsService.ownersInstitutions(user.id);
  }

  @Query(() => PaginatedInstitutionsType)
  public async usersInstitutions(
    @CurrentUser() user: IAccessUser,
    @Args() dto: SearchDto,
  ): Promise<IPaginated<InstitutionEntity>> {
    return this.institutionsService.usersInstitutions(user.id, dto);
  }

  @ResolveField('owner', () => UserEntity)
  public getUser() {
    return;
  }

  @ResolveField('addresses', () => [AddressEntity])
  public getAddresses() {
    return;
  }

  @ResolveField('profiles', () => PaginatedProfilesType)
  public getProfiles(@Args() _: FilterRelationDto) {
    return;
  }

  // Resolved by the loaders
  @ResolveReference()
  public resolveReference(_: unknown) {
    return;
  }
}
