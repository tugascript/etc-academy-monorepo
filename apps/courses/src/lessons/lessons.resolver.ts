import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators';
import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { ResourceEntity } from '../resources/entities/resource.entity';
import { FilterLessonsDto } from './dtos/filter-lessons.dto';
import { LessonDto } from './dtos/lesson.dto';
import { UpdateLessonLinkDto } from './dtos/update-lesson-link.dto';
import { UpdateLessonTimeDto } from './dtos/update-lesson-time.dto';
import { UpdateLessonTitleDto } from './dtos/update-lesson-title.dto';
import { UpdateLessonTypeDto } from './dtos/update-lesson-type.dto';
import { PaginatedLessonsType } from './entities/gql/paginated-lessons.type';
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { LessonsService } from './lessons.service';

@Resolver(() => LessonEntity)
export class LessonsResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Mutation(() => LessonEntity)
  public async createLesson(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: CreateLessonInput,
  ): Promise<LessonEntity> {
    return this.lessonsService.createLesson(user.id, input);
  }

  @Mutation(() => LessonEntity)
  public async updateLessonLink(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateLessonLinkDto,
  ): Promise<LessonEntity> {
    return this.lessonsService.updateLessonLink(user.id, dto);
  }

  @Mutation(() => LessonEntity)
  public async updateLessonTime(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateLessonTimeDto,
  ): Promise<LessonEntity> {
    return this.lessonsService.updateLessonTime(user.id, dto);
  }

  @Mutation(() => LessonEntity)
  public async updateLessonTitle(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateLessonTitleDto,
  ): Promise<LessonEntity> {
    return this.lessonsService.updateLessonTitle(user.id, dto);
  }

  @Mutation(() => LessonEntity)
  public async updateLessonType(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateLessonTypeDto,
  ): Promise<LessonEntity> {
    return this.lessonsService.updateLessonType(user.id, dto);
  }

  @Mutation(() => LocalMessageType)
  public async deleteLesson(
    @CurrentUser() user: IAccessUser,
    @Args() dto: LessonDto,
  ): Promise<LocalMessageType> {
    return this.lessonsService.deleteLesson(user.id, dto);
  }

  @Query(() => LessonEntity)
  public async lessonById(
    @CurrentUser() user: IAccessUser,
    @Args() dto: LessonDto,
  ): Promise<LessonEntity> {
    return this.lessonsService.lessonById(user.id, dto);
  }

  @Query(() => PaginatedLessonsType)
  public async filterLessons(
    @CurrentUser() user: IAccessUser,
    @Args() dto: FilterLessonsDto,
  ): Promise<IPaginated<LessonEntity>> {
    return this.lessonsService.filterLessons(user.id, dto);
  }

  @ResolveReference()
  public resolveReference(_: IReference) {
    return;
  }

  @ResolveField('resources', () => [ResourceEntity])
  public async getResources() {
    return;
  }
}
