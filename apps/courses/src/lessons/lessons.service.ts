import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CommonService } from '../common';
import { LocalMessageType } from '../common/entities/gql';
import { ProfileRoleEnum } from '../common/enums';
import { IPaginated } from '../common/interfaces';
import { CourseProfileEntity } from '../profiles/entities/course-profile.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { FilterLessonsDto } from './dtos/filter-lessons.dto';
import { LessonDto } from './dtos/lesson.dto';
import { UpdateLessonLinkDto } from './dtos/update-lesson-link.dto';
import { UpdateLessonTimeDto } from './dtos/update-lesson-time.dto';
import { UpdateLessonTitleDto } from './dtos/update-lesson-title.dto';
import { UpdateLessonTypeDto } from './dtos/update-lesson-type.dto';
import { LessonEntity } from './entities/lesson.entity';
import { LessonTypeEnum } from './enums/lesson-type.enum';
import { CreateLessonInput } from './inputs/create-lesson.input';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonsRepository: EntityRepository<LessonEntity>,
    private readonly profilesService: ProfilesService,
    private readonly commonService: CommonService,
  ) {}

  public async createLesson(
    userId: number,
    { courseId, lessonType, title, time, link }: CreateLessonInput,
  ): Promise<LessonEntity> {
    const profile = await this.checkProfile(userId, courseId);
    const lessonTime = new Date(time);

    if (lessonTime.getTime() - Date.now() < 0)
      throw new BadRequestException('Lesson time must be in future');

    const lesson = this.lessonsRepository.create({
      title: this.commonService.formatTitle(title),
      time: lessonTime,
      num: (await this.lessonsRepository.count({ course: courseId })) + 1,
      lessonType,
      manager: profile.id,
    });

    if (lessonType === LessonTypeEnum.ONLINE && link) lesson.link = link;

    await this.commonService.saveEntity(this.lessonsRepository, lesson, true);
    return lesson;
  }

  public async updateLessonTime(
    userId: number,
    { courseId, lessonId, time }: UpdateLessonTimeDto,
  ): Promise<LessonEntity> {
    await this.checkProfile(userId, courseId);
    const lesson = await this.getLessonById(courseId, lessonId);
    this.checkLessonForUpdate(lesson);
    const lessonTime = new Date(time);

    if (lessonTime.getTime() - Date.now() < 0)
      throw new BadRequestException('Lesson time must be in future');

    lesson.time = lessonTime;
    await this.commonService.saveEntity(this.lessonsRepository, lesson);
    return lesson;
  }

  public async updateLessonTitle(
    userId: number,
    { courseId, lessonId, title }: UpdateLessonTitleDto,
  ): Promise<LessonEntity> {
    await this.checkProfile(userId, courseId);
    const lesson = await this.getLessonById(courseId, lessonId);
    lesson.title = this.commonService.formatTitle(title);
    await this.commonService.saveEntity(this.lessonsRepository, lesson);
    return lesson;
  }

  public async updateLessonType(
    userId: number,
    { courseId, lessonId, lessonType, link }: UpdateLessonTypeDto,
  ): Promise<LessonEntity> {
    await this.checkProfile(userId, courseId);
    const lesson = await this.getLessonById(courseId, lessonId);
    this.checkLessonForUpdate(lesson);
    lesson.lessonType = lessonType;

    if (lessonType === LessonTypeEnum.ONLINE) {
      if (link) lesson.link = link;
    } else {
      lesson.link = null;
    }

    return lesson;
  }

  public async updateLessonLink(
    userId: number,
    { courseId, lessonId, link }: UpdateLessonLinkDto,
  ): Promise<LessonEntity> {
    await this.checkProfile(userId, courseId);
    const lesson = await this.getLessonById(courseId, lessonId);
    this.checkLessonForUpdate(lesson);

    if (lesson.lessonType !== LessonTypeEnum.ONLINE)
      throw new BadRequestException(
        'You can not add a link to an in-person lesson',
      );

    lesson.link = link;
    return lesson;
  }

  public async deleteLesson(
    userId: number,
    { courseId, lessonId }: LessonDto,
  ): Promise<LocalMessageType> {
    await this.checkProfile(userId, courseId);
    const lesson = await this.getLessonById(courseId, lessonId);
    this.checkLessonForUpdate(lesson);
    await this.commonService.removeEntity(this.lessonsRepository, lesson);
    return new LocalMessageType('Lesson deleted successfully');
  }

  public async lessonById(
    userId: number,
    { lessonId, courseId }: LessonDto,
  ): Promise<LessonEntity> {
    await this.profilesService.checkProfileExistence(userId, courseId);
    return this.getLessonById(courseId, lessonId);
  }

  public async filterLessons(
    userId: number,
    { courseId, order, first, after }: FilterLessonsDto,
  ): Promise<IPaginated<LessonEntity>> {
    await this.profilesService.checkProfileExistence(userId, courseId);
    const qb = this.lessonsRepository
      .createQueryBuilder('l')
      .where({ course: courseId });
    return this.commonService.queryBuilderPagination(
      'l',
      'id',
      first,
      order,
      qb,
      after,
      true,
    );
  }

  public async lessonByIdWithManager(lessonId: number): Promise<LessonEntity> {
    const lesson = await this.lessonsRepository.findOne(
      {
        id: lessonId,
      },
      { populate: ['manager'] },
    );
    this.commonService.checkExistence('Lesson', lesson);
    return lesson;
  }

  private async getLessonById(
    courseId: number,
    lessonId: number,
  ): Promise<LessonEntity> {
    const lesson = await this.lessonsRepository.findOne({
      course: courseId,
      id: lessonId,
    });
    this.commonService.checkExistence('Lesson', lesson);
    return lesson;
  }

  private async checkProfile(
    userId: number,
    courseId: number,
  ): Promise<CourseProfileEntity> {
    const profile = await this.profilesService.profileByUserId(
      userId,
      courseId,
    );

    if (
      profile.role !== ProfileRoleEnum.ADMIN &&
      profile.role !== ProfileRoleEnum.TEACHER
    )
      throw new UnauthorizedException('You are not authorized to edit lessons');

    return profile;
  }

  private checkLessonForUpdate(lesson: LessonEntity): void {
    if (lesson.time.getTime() - Date.now() < 0)
      throw new BadRequestException('You can not update a past lesson');
  }
}
