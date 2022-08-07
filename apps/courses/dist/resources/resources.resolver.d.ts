import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IReference } from '../common/interfaces';
import { LessonIdDto } from './dtos/lesson-id.dto';
import { ResourceDto } from './dtos/resource.dto';
import { UpdateResourceFileDto } from './dtos/update-resource-file.dto';
import { UpdateResourceInfoDto } from './dtos/update-resource-info.dto';
import { UpdateResourceTitleDto } from './dtos/update-resource-title.dto';
import { ResourceEntity } from './entities/resource.entity';
import { CreateResourceInput } from './inputs/create-resource.input';
import { ResourcesService } from './resources.service';
export declare class ResourcesResolver {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    createResource(user: IAccessUser, input: CreateResourceInput): Promise<ResourceEntity>;
    updateResourceFile(user: IAccessUser, dto: UpdateResourceFileDto): Promise<ResourceEntity>;
    updateResourceInfo(user: IAccessUser, dto: UpdateResourceInfoDto): Promise<ResourceEntity>;
    updateResourceTitle(user: IAccessUser, dto: UpdateResourceTitleDto): Promise<ResourceEntity>;
    deleteResource(user: IAccessUser, dto: ResourceDto): Promise<LocalMessageType>;
    resourcesByLesson(user: IAccessUser, dto: LessonIdDto): Promise<ResourceEntity[]>;
    resourceById(user: IAccessUser, dto: ResourceDto): Promise<ResourceEntity>;
    resolveReference(_: IReference): void;
}
