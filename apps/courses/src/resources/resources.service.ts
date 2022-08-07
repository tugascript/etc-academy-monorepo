import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CommonService } from '../common';
import { LocalMessageType } from '../common/entities/gql';
import { LessonsService } from '../lessons/lessons.service';
import { UploaderService } from '../uploader';
import { DOCUMENT_TYPES } from '../uploader/constants';
import { FileUploadDto } from '../uploader/dtos';
import { DocumentTypeEnum } from '../uploader/enums';
import { ResourceDto } from './dtos/resource.dto';
import { UpdateResourceFileDto } from './dtos/update-resource-file.dto';
import { UpdateResourceInfoDto } from './dtos/update-resource-info.dto';
import { UpdateResourceTitleDto } from './dtos/update-resource-title.dto';
import { ResourceEntity } from './entities/resource.entity';
import { CreateResourceInput } from './inputs/create-resource.input';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: EntityRepository<ResourceEntity>,
    private readonly commonService: CommonService,
    private readonly uploaderService: UploaderService,
    private readonly lessonsService: LessonsService,
  ) {}

  public async createResource(
    userId: number,
    { lessonId, title, file, info }: CreateResourceInput,
  ): Promise<ResourceEntity> {
    await this.checkLesson(userId, lessonId);
    const resourceType = await this.checkFile(file);
    const link = await this.uploaderService.uploadDocument(userId, file);
    const resource = this.resourceRepository.create({
      title: this.commonService.formatTitle(title),
      lesson: lessonId,
      link,
      resourceType,
      info,
    });
    await this.commonService.saveEntity(
      this.resourceRepository,
      resource,
      true,
    );
    return resource;
  }

  public async updateResourceFile(
    userId: number,
    { lessonId, resourceId, file }: UpdateResourceFileDto,
  ): Promise<ResourceEntity> {
    await this.checkLesson(userId, lessonId);
    const resource = await this.findResourceById(lessonId, resourceId);
    const resourceType = await this.checkFile(file);
    const link = await this.uploaderService.uploadDocument(userId, file);
    resource.link = link;
    resource.resourceType = resourceType;
    await this.commonService.saveEntity(this.resourceRepository, resource);
    return resource;
  }

  public async updateResourceInfo(
    userId: number,
    { lessonId, resourceId, info }: UpdateResourceInfoDto,
  ): Promise<ResourceEntity> {
    await this.checkLesson(userId, lessonId);
    const resource = await this.findResourceById(lessonId, resourceId);
    resource.info = info;
    await this.commonService.saveEntity(this.resourceRepository, resource);
    return resource;
  }

  public async updateResourceTitle(
    userId: number,
    { lessonId, resourceId, title }: UpdateResourceTitleDto,
  ): Promise<ResourceEntity> {
    await this.checkLesson(userId, lessonId);
    const resource = await this.findResourceById(lessonId, resourceId);
    resource.title = this.commonService.formatTitle(title);
    await this.commonService.saveEntity(this.resourceRepository, resource);
    return resource;
  }

  public async deleteResource(
    userId: number,
    { lessonId, resourceId }: ResourceDto,
  ): Promise<LocalMessageType> {
    await this.checkLesson(userId, lessonId);
    const resource = await this.findResourceById(lessonId, resourceId);
    await this.commonService.removeEntity(this.resourceRepository, resource);
    return new LocalMessageType('Resource deleted successfully');
  }

  public async resourceById(
    userId: number,
    { lessonId, resourceId }: ResourceDto,
  ): Promise<ResourceEntity> {
    await this.checkLesson(userId, lessonId);
    return this.findResourceById(lessonId, resourceId);
  }

  public async resourcesByLesson(
    userId: number,
    lessonId: number,
  ): Promise<ResourceEntity[]> {
    await this.checkLesson(userId, lessonId);
    return this.resourceRepository.find({
      lesson: lessonId,
    });
  }

  private async findResourceById(
    lessonId: number,
    resourceId: number,
  ): Promise<ResourceEntity> {
    const resource = await this.resourceRepository.findOne({
      id: resourceId,
      lesson: lessonId,
    });
    this.commonService.checkExistence('Resource', resource);
    return resource;
  }

  private async checkFile(
    file: Promise<FileUploadDto>,
  ): Promise<DocumentTypeEnum> {
    const { mimetype } = await file;
    const documentType = DOCUMENT_TYPES[mimetype];

    if (!documentType) throw new BadRequestException('Invalid file type');

    return documentType.fileType;
  }

  private async checkLesson(userId: number, lessonId: number): Promise<void> {
    const lesson = await this.lessonsService.lessonByIdWithManager(lessonId);

    if (lesson.manager.userId !== userId)
      throw new UnauthorizedException('You are not manager of this lesson');
  }
}
