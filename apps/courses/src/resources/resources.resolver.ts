import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators';
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

@Resolver(() => ResourceEntity)
export class ResourcesResolver {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Mutation(() => ResourceEntity)
  public async createResource(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: CreateResourceInput,
  ): Promise<ResourceEntity> {
    return this.resourcesService.createResource(user.id, input);
  }

  @Mutation(() => ResourceEntity)
  public async updateResourceFile(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateResourceFileDto,
  ): Promise<ResourceEntity> {
    return this.resourcesService.updateResourceFile(user.id, dto);
  }

  @Mutation(() => ResourceEntity)
  public async updateResourceInfo(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateResourceInfoDto,
  ): Promise<ResourceEntity> {
    return this.resourcesService.updateResourceInfo(user.id, dto);
  }

  @Mutation(() => ResourceEntity)
  public async updateResourceTitle(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateResourceTitleDto,
  ): Promise<ResourceEntity> {
    return this.resourcesService.updateResourceTitle(user.id, dto);
  }

  @Mutation(() => LocalMessageType)
  public async deleteResource(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ResourceDto,
  ): Promise<LocalMessageType> {
    return this.resourcesService.deleteResource(user.id, dto);
  }

  @Query(() => [ResourceEntity])
  public async resourcesByLesson(
    @CurrentUser() user: IAccessUser,
    @Args() dto: LessonIdDto,
  ): Promise<ResourceEntity[]> {
    return this.resourcesService.resourcesByLesson(user.id, dto.lessonId);
  }

  @Query(() => ResourceEntity)
  public async resourceById(
    @CurrentUser() user: IAccessUser,
    @Args() dto: ResourceDto,
  ): Promise<ResourceEntity> {
    return this.resourcesService.resourceById(user.id, dto);
  }

  @ResolveReference()
  public resolveReference(_: IReference) {
    return;
  }
}
