import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CommonService } from '../common';
import { LocalMessageType } from '../common/entities/gql';
import {
  getQueryCursor,
  ProfileRoleEnum,
  QueryCursorEnum,
  RatioEnum,
} from '../common/enums';
import { IAccessUser, IPaginated } from '../common/interfaces';
import { UploaderService } from '../uploader';
import { FilterCoursesDto } from './dtos/filter-courses.dto';
import { UpdateCourseDescriptionDto } from './dtos/update-course-description.dto';
import { UpdateCourseNameDto } from './dtos/update-course-name.dto';
import { UpdateCoursePictureDto } from './dtos/update-course-picture.dto';
import { UpdateCourseTypeDto } from './dtos/update-course-type.dto';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseInput } from './inputs/create-course.input';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: EntityRepository<CourseEntity>,
    private readonly commonService: CommonService,
    private readonly uploaderService: UploaderService,
  ) {}

  public async createCourse(
    user: IAccessUser,
    {
      institutionId,
      name,
      courseType,
      description,
      picture,
    }: CreateCourseInput,
  ): Promise<CourseEntity> {
    const role = this.commonService.getUserRole(user, institutionId);

    if (role !== ProfileRoleEnum.ADMIN)
      throw new UnauthorizedException('Only admin can create courses');

    name = this.commonService.formatTitle(name);
    await this.checkCourseExistence(name, institutionId);
    const slug = this.commonService.generateSlug(name);
    const course = this.coursesRepository.create({
      institutionId,
      name,
      slug,
      courseType,
      description,
      authorId: user.id,
    });

    if (picture) {
      course.picture = await this.uploaderService.uploadImage(
        user.id,
        picture,
        RatioEnum.BANNER,
      );
    }

    await this.commonService.saveEntity(this.coursesRepository, course, true);
    return course;
  }

  public async updateCourseName(
    user: IAccessUser,
    { name, courseId }: UpdateCourseNameDto,
  ): Promise<CourseEntity> {
    const course = await this.findCourseById(courseId);
    this.checkAdmin(user, course);
    name = this.commonService.formatTitle(name);
    await this.checkCourseExistence(name, courseId);
    const slug = this.commonService.generateSlug(name);
    course.name = name;
    course.slug = slug;
    await this.commonService.saveEntity(this.coursesRepository, course);
    return course;
  }

  public async updateCourseDescription(
    user: IAccessUser,
    { description, courseId }: UpdateCourseDescriptionDto,
  ): Promise<CourseEntity> {
    const course = await this.findCourseById(courseId);
    this.checkAdmin(user, course);
    course.description = description;
    await this.commonService.saveEntity(this.coursesRepository, course);
    return course;
  }

  public async updateCoursePicture(
    user: IAccessUser,
    { picture, courseId }: UpdateCoursePictureDto,
  ): Promise<CourseEntity> {
    const course = await this.findCourseById(courseId);
    this.checkAdmin(user, course);
    const toDelete = course.picture;
    course.picture = await this.uploaderService.uploadImage(
      user.id,
      picture,
      RatioEnum.BANNER,
    );
    await this.commonService.saveEntity(this.coursesRepository, course);

    if (toDelete) this.uploaderService.deleteFile(toDelete);

    return course;
  }

  public async updateCourseType(
    user: IAccessUser,
    { courseType, courseId }: UpdateCourseTypeDto,
  ): Promise<CourseEntity> {
    const course = await this.findCourseById(courseId);
    this.checkAdmin(user, course);
    course.courseType = courseType;
    await this.commonService.saveEntity(this.coursesRepository, course);
    return course;
  }

  public async deleteCourse(
    userId: number,
    courseId: number,
  ): Promise<LocalMessageType> {
    const course = await this.findCourseById(courseId);

    if (course.authorId !== userId)
      throw new UnauthorizedException('You can only delete your own courses');

    await this.commonService.removeEntity(this.coursesRepository, course);
    return new LocalMessageType('Course deleted successfully');
  }

  public async courseById(
    user: IAccessUser,
    courseId: number,
  ): Promise<CourseEntity> {
    const course = await this.findCourseById(courseId);
    this.commonService.getUserRole(user, course.institutionId);
    return course;
  }

  public async courseBySlug(
    user: IAccessUser,
    slug: string,
  ): Promise<CourseEntity> {
    const course = await this.coursesRepository.findOne({ slug });
    this.commonService.checkExistence('Course', course);
    this.commonService.getUserRole(user, course.institutionId);
    return course;
  }

  public async filterCourses(
    user: IAccessUser,
    { institutionId, search, cursor, order, first, after }: FilterCoursesDto,
  ): Promise<IPaginated<CourseEntity>> {
    this.commonService.getUserRole(user, institutionId);
    const qb = this.coursesRepository
      .createQueryBuilder('c')
      .where({ institutionId });

    if (search) {
      search = this.commonService.formatSearch(search);
      qb.andWhere({
        $or: [
          {
            name: {
              $iLike: search,
            },
          },
          {
            description: {
              $iLike: search,
            },
          },
        ],
      });
    }

    return this.commonService.queryBuilderPagination(
      'c',
      getQueryCursor(cursor) as keyof CourseEntity,
      first,
      order,
      qb,
      after,
      cursor === QueryCursorEnum.DATE,
    );
  }

  private async findCourseById(courseId: number): Promise<CourseEntity> {
    const course = this.coursesRepository.findOne({ id: courseId });
    this.commonService.checkExistence('Course', course);
    return course;
  }

  private checkAdmin(user: IAccessUser, course: CourseEntity): void {
    if (course.authorId !== user.id) {
      const role = this.commonService.getUserRole(user, course.institutionId);

      if (role !== ProfileRoleEnum.ADMIN)
        throw new UnauthorizedException('Only admin can update courses');
    }
  }

  private async checkCourseExistence(
    name: string,
    institutionId: number,
  ): Promise<void> {
    const count = await this.coursesRepository.count({
      name,
      institutionId,
    });

    if (count > 0) throw new ConflictException('Course already exists');
  }
}
