import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CurrentUser } from '../common/decorators';
import { FilterRelationDto, SlugDto } from '../common/dtos';
import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { InstitutionEntity } from '../external/entities/institution.entity';
import { UserEntity } from '../external/entities/user.entity';
import { PaginatedLessonsType } from '../lessons/entities/gql/paginated-lessons.type';
import { PaginatedCourseProfilesType } from '../profiles/entities/gql/paginated-course-profiles.type';
import { CoursesService } from './courses.service';
import { CourseDto } from './dtos/course.dto';
import { FilterCoursesDto } from './dtos/filter-courses.dto';
import { UpdateCourseDescriptionDto } from './dtos/update-course-description.dto';
import { UpdateCourseNameDto } from './dtos/update-course-name.dto';
import { UpdateCoursePictureDto } from './dtos/update-course-picture.dto';
import { UpdateCourseTypeDto } from './dtos/update-course-type.dto';
import { CourseEntity } from './entities/course.entity';
import { PaginatedCoursesType } from './entities/gql/paginated-courses.type';
import { CreateCourseInput } from './inputs/create-course.input';

@Resolver(() => CourseEntity)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => CourseEntity)
  public async createCourse(
    @CurrentUser() user: IAccessUser,
    @Args('input') input: CreateCourseInput,
  ): Promise<CourseEntity> {
    return this.coursesService.createCourse(user, input);
  }

  @Mutation(() => CourseEntity)
  public async updateCourseName(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateCourseNameDto,
  ): Promise<CourseEntity> {
    return this.coursesService.updateCourseName(user, dto);
  }

  @Mutation(() => CourseEntity)
  public async updateCourseDescription(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateCourseDescriptionDto,
  ): Promise<CourseEntity> {
    return this.coursesService.updateCourseDescription(user, dto);
  }

  @Mutation(() => CourseEntity)
  public async updateCoursePicture(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateCoursePictureDto,
  ): Promise<CourseEntity> {
    return this.coursesService.updateCoursePicture(user, dto);
  }

  @Mutation(() => CourseEntity)
  public async updateCourseType(
    @CurrentUser() user: IAccessUser,
    @Args() dto: UpdateCourseTypeDto,
  ): Promise<CourseEntity> {
    return this.coursesService.updateCourseType(user, dto);
  }

  @Mutation(() => LocalMessageType)
  public async deleteCourse(
    @CurrentUser() user: IAccessUser,
    @Args() dto: CourseDto,
  ): Promise<LocalMessageType> {
    return this.coursesService.deleteCourse(user.id, dto.courseId);
  }

  @Query(() => CourseEntity)
  public async courseById(
    @CurrentUser() user: IAccessUser,
    @Args() dto: CourseDto,
  ): Promise<CourseEntity> {
    return this.coursesService.courseById(user, dto.courseId);
  }

  @Query(() => CourseEntity)
  public async courseBySlug(
    @CurrentUser() user: IAccessUser,
    @Args() dto: SlugDto,
  ): Promise<CourseEntity> {
    return this.coursesService.courseBySlug(user, dto.slug);
  }

  @Query(() => PaginatedCoursesType)
  public async filterCourses(
    @CurrentUser() user: IAccessUser,
    @Args() dto: FilterCoursesDto,
  ): Promise<IPaginated<CourseEntity>> {
    return this.coursesService.filterCourses(user, dto);
  }

  @ResolveReference()
  public resolveReference(_: IReference) {
    return;
  }

  @ResolveField('author', () => UserEntity)
  public getAuthor(@Parent() course: CourseEntity): IReference {
    return { __typename: 'User', id: course.authorId.toString() };
  }

  @ResolveField('institution', () => InstitutionEntity)
  public getInstitution(@Parent() course: CourseEntity): IReference {
    return { __typename: 'Institution', id: course.institutionId.toString() };
  }

  @ResolveField('profiles', () => PaginatedCourseProfilesType)
  public async getProfiles(@Args() _: FilterRelationDto) {
    return;
  }

  @ResolveField('lessons', () => PaginatedLessonsType)
  public async getLessons(@Args() _: FilterRelationDto) {
    return;
  }
}
