import { EntityRepository } from '@mikro-orm/postgresql';
import { CommonService } from '../common';
import { LocalMessageType } from '../common/entities/gql';
import { LessonsService } from '../lessons/lessons.service';
import { UploaderService } from '../uploader';
import { ResourceDto } from './dtos/resource.dto';
import { UpdateResourceFileDto } from './dtos/update-resource-file.dto';
import { UpdateResourceInfoDto } from './dtos/update-resource-info.dto';
import { UpdateResourceTitleDto } from './dtos/update-resource-title.dto';
import { ResourceEntity } from './entities/resource.entity';
import { CreateResourceInput } from './inputs/create-resource.input';
export declare class ResourcesService {
    private readonly resourceRepository;
    private readonly commonService;
    private readonly uploaderService;
    private readonly lessonsService;
    constructor(resourceRepository: EntityRepository<ResourceEntity>, commonService: CommonService, uploaderService: UploaderService, lessonsService: LessonsService);
    createResource(userId: number, { lessonId, title, file, info }: CreateResourceInput): Promise<ResourceEntity>;
    updateResourceFile(userId: number, { lessonId, resourceId, file }: UpdateResourceFileDto): Promise<ResourceEntity>;
    updateResourceInfo(userId: number, { lessonId, resourceId, info }: UpdateResourceInfoDto): Promise<ResourceEntity>;
    updateResourceTitle(userId: number, { lessonId, resourceId, title }: UpdateResourceTitleDto): Promise<ResourceEntity>;
    deleteResource(userId: number, { lessonId, resourceId }: ResourceDto): Promise<LocalMessageType>;
    resourceById(userId: number, { lessonId, resourceId }: ResourceDto): Promise<ResourceEntity>;
    resourcesByLesson(userId: number, lessonId: number): Promise<ResourceEntity[]>;
    private findResourceById;
    private checkFile;
    private checkLesson;
}
