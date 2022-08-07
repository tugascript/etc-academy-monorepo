import { SearchDto, SlugDto } from '../common/dtos';
import { FilterRelationDto } from '../common/dtos/filter-relation.dto';
import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { InstitutionDto } from './dtos/institution.dto';
import { SearchInstitutionsDto } from './dtos/search-institutions.dto';
import { UpdateInstitutionDescriptionDto } from './dtos/update-institution-description.dto';
import { UpdateInstitutionNameDto } from './dtos/update-institution-name.dto';
import { UpdateInstitutionPictureDto } from './dtos/update-institution-picture.dto';
import { InstitutionEntity } from './entities/institution.entity';
import { CreateInstitutionInput } from './inputs/create-institution.input';
import { InstitutionsService } from './institutions.service';
export declare class InstitutionsResolver {
    private readonly institutionsService;
    constructor(institutionsService: InstitutionsService);
    createInstitution(user: IAccessUser, input: CreateInstitutionInput): Promise<InstitutionEntity>;
    updateInstitutionName(user: IAccessUser, dto: UpdateInstitutionNameDto): Promise<InstitutionEntity>;
    updateInstitutionDescription(user: IAccessUser, dto: UpdateInstitutionDescriptionDto): Promise<InstitutionEntity>;
    updateInstitutionPicture(user: IAccessUser, dto: UpdateInstitutionPictureDto): Promise<InstitutionEntity>;
    deleteInstitution(user: IAccessUser, dto: InstitutionDto): Promise<LocalMessageType>;
    institutionById(dto: InstitutionDto): Promise<InstitutionEntity>;
    institutionBySlug(dto: SlugDto): Promise<InstitutionEntity>;
    searchInstitutions(dto: SearchInstitutionsDto): Promise<IPaginated<InstitutionEntity>>;
    ownersInstitutions(user: IAccessUser): Promise<InstitutionEntity[]>;
    usersInstitutions(user: IAccessUser, dto: SearchDto): Promise<IPaginated<InstitutionEntity>>;
    getAddresses(): void;
    getProfiles(_: FilterRelationDto): void;
    resolveReference(_: IReference): void;
}
