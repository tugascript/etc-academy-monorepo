import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { InstitutionEntity } from './entities/institution.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CommonService } from 'app/common';
import { UploaderService } from 'app/uploader';
import { CreateInstitutionInput } from './inputs/create-institution.input';
import {
  getQueryCursor,
  ProfileRoleEnum,
  QueryCursorEnum,
  RatioEnum,
} from 'app/common/enums';
import { AddressesService } from '../addresses/addresses.service';
import { ProfilesService } from '../profiles/profiles.service';
import { UpdateInstitutionNameDto } from './dtos/update-institution-name.dto';
import { IInstitution } from './interfaces/institution.interface';
import { UpdateInstitutionDescriptionDto } from './dtos/update-institution-description.dto';
import { UpdateInstitutionPictureDto } from './dtos/update-institution-picture.dto';
import { LocalMessageType } from 'app/common/entities/gql';
import { IPaginated } from 'app/common/interfaces';
import { SearchInstitutionsDto } from './dtos/search-institutions.dto';
import { SearchDto } from 'app/common/dtos';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(InstitutionEntity)
    private readonly institutionsRepository: EntityRepository<InstitutionEntity>,
    private readonly commonService: CommonService,
    private readonly uploaderService: UploaderService,
    private readonly profilesService: ProfilesService,
    private readonly addressesService: AddressesService,
  ) {}

  public async createInstitution(
    userId: number,
    {
      name,
      institutionType,
      picture,
      description,
      vatNumber,
      address,
    }: CreateInstitutionInput,
  ): Promise<InstitutionEntity> {
    name = this.commonService.formatTitle(name);
    await this.checkExistence(userId, name);
    const slug = await this.generateSlug(name);
    const image = await this.uploaderService.uploadImage(
      userId,
      picture,
      RatioEnum.BANNER,
    );
    const institution = this.institutionsRepository.create({
      name,
      slug,
      institutionType,
      description,
      vatNumber,
      picture: image,
    });
    await this.commonService.saveEntity(
      this.institutionsRepository,
      institution,
      true,
    );
    await this.profilesService.createInitialProfile(userId, institution.id);
    await this.addressesService.createInitialAddress(
      userId,
      institution.id,
      address,
    );

    return institution;
  }

  public async updateInstitutionName(
    userId: number,
    { institutionId, name }: UpdateInstitutionNameDto,
  ): Promise<InstitutionEntity> {
    const institution = await this.institutionById(institutionId);
    await this.checkProfile(userId, institution);
    name = this.commonService.formatTitle(name);
    await this.checkExistence(userId, name);
    const slug = await this.generateSlug(name);
    institution.name = name;
    institution.slug = slug;
    await this.commonService.saveEntity(
      this.institutionsRepository,
      institution,
    );
    return institution;
  }

  public async updateInstitutionDescription(
    userId: number,
    { institutionId, description }: UpdateInstitutionDescriptionDto,
  ): Promise<InstitutionEntity> {
    const institution = await this.institutionById(institutionId);
    await this.checkProfile(userId, institution);
    institution.description = description;
    await this.commonService.saveEntity(
      this.institutionsRepository,
      institution,
    );
    return institution;
  }

  public async updateInstitutionPicture(
    userId: number,
    { institutionId, picture }: UpdateInstitutionPictureDto,
  ): Promise<InstitutionEntity> {
    const institution = await this.institutionById(institutionId);
    await this.checkProfile(userId, institution);
    const toDelete = institution.picture;
    institution.picture = await this.uploaderService.uploadImage(
      userId,
      picture,
      RatioEnum.BANNER,
    );
    await this.commonService.saveEntity(
      this.institutionsRepository,
      institution,
    );
    this.uploaderService.deleteFile(toDelete);
    return institution;
  }

  public async deleteInstitution(
    userId: number,
    institutionId: number,
  ): Promise<LocalMessageType> {
    const institution = await this.institutionById(institutionId);

    if (userId !== institution.owner.id)
      throw new UnauthorizedException(
        'Only the owner can delete his institution',
      );

    await this.commonService.removeEntity(
      this.institutionsRepository,
      institution,
    );
    return new LocalMessageType('Institution deleted successfully');
  }

  public async institutionById(
    institutionId: number,
  ): Promise<InstitutionEntity> {
    const institution = await this.institutionsRepository.findOne({
      id: institutionId,
    });
    this.commonService.checkExistence('Institution', institution);
    return institution;
  }

  public async institutionBySlug(slug: string): Promise<InstitutionEntity> {
    const institution = await this.institutionsRepository.findOne({
      slug,
    });
    this.commonService.checkExistence('Institution', institution);
    return institution;
  }

  public async searchInstitutions({
    institutionType,
    country,
    search,
    cursor,
    order,
    first,
    after,
  }: SearchInstitutionsDto): Promise<IPaginated<InstitutionEntity>> {
    const qb = this.institutionsRepository.createQueryBuilder('i');

    if (search) {
      search = this.commonService.formatSearch(search);
      qb.where({
        $or: [
          {
            name: {
              $ilike: search,
            },
          },
          {
            description: {
              $ilike: search,
            },
          },
        ],
      });
    }
    if (institutionType) qb.andWhere({ institutionType });
    if (country) {
      qb.leftJoin('i.addresses', 'a').andWhere({
        addresses: {
          country,
        },
      });
    }

    return this.commonService.queryBuilderPagination(
      'i',
      getQueryCursor(cursor) as keyof InstitutionEntity,
      first,
      order,
      qb,
      after,
      cursor === QueryCursorEnum.DATE,
    );
  }

  public async ownersInstitutions(
    userId: number,
  ): Promise<InstitutionEntity[]> {
    const institutions = await this.institutionsRepository.find({
      owner: { id: userId },
    });
    return institutions;
  }

  public async usersInstitutions(
    userId: number,
    { search, cursor, order, first, after }: SearchDto,
  ): Promise<IPaginated<InstitutionEntity>> {
    const qb = this.institutionsRepository
      .createQueryBuilder('i')
      .leftJoin('i.profiles', 'p')
      .where({
        profiles: {
          user: userId,
        },
      });

    if (search) {
      search = this.commonService.formatSearch(search);
      qb.where({
        $or: [
          {
            name: {
              $ilike: search,
            },
          },
          {
            description: {
              $ilike: search,
            },
          },
        ],
      });
    }

    return this.commonService.queryBuilderPagination(
      'i',
      getQueryCursor(cursor) as keyof InstitutionEntity,
      first,
      order,
      qb,
      after,
      cursor === QueryCursorEnum.DATE,
    );
  }

  private async checkExistence(userId: number, name: string): Promise<void> {
    const count = await this.institutionsRepository.count({
      owner: userId,
      name,
    });

    if (count > 0) {
      throw new BadRequestException(
        'Institution with this name already exists',
      );
    }
  }

  private async generateSlug(name: string): Promise<string> {
    const slug = this.commonService.generatePointSlug(name);
    const count = await this.institutionsRepository.count({
      slug: {
        $like: `${slug}%`,
      },
    });

    if (count > 0) return slug + count.toString();

    return slug;
  }

  private async checkProfile(
    userId: number,
    institution: IInstitution,
  ): Promise<void> {
    if (institution.owner.id !== userId) {
      const profile = await this.profilesService.profileByRelations(
        userId,
        institution.id,
      );

      if (profile.role === ProfileRoleEnum.ADMIN) return;
    }

    throw new UnauthorizedException(
      'You are not allowed edit this institution',
    );
  }
}
