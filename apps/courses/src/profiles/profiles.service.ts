import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CommonService } from '../common';
import { LocalMessageType } from '../common/entities/gql';
import { ProfileRoleEnum, ProfileStatusEnum } from '../common/enums';
import {
  IAccessUser,
  IMessageProfile,
  IPaginated,
  IRedisMessage,
} from '../common/interfaces';
import { CoursesService } from '../courses/courses.service';
import { FilterProfilesDto } from './dtos/filter-profiles.dto';
import { ProfileSlugDto } from './dtos/profile-slug.dto';
import { ProfileDto } from './dtos/profile.dto';
import { UpdateProfileStatusDto } from './dtos/update-profile-status.dto';
import { CourseProfileEntity } from './entities/course-profile.entity';
import { CreateProfileInput } from './inputs/create-profile.input';

@Injectable()
export class ProfilesService {
  private readonly coursesNamespace =
    this.configService.get<string>('COURSES_UUID');

  constructor(
    @InjectRepository(CourseProfileEntity)
    private readonly profilesRepository: EntityRepository<CourseProfileEntity>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    private readonly coursesService: CoursesService,
    @Inject('USER_SERVICE')
    private readonly usersClient: ClientProxy,
  ) {}

  public async createInitialProfile(
    user: IAccessUser,
    institutionId: number,
    courseId: number,
  ): Promise<CourseProfileEntity> {
    const profile = this.profilesRepository.create({
      slug: this.commonService.generateSlug(user.name),
      course: courseId,
      role: ProfileRoleEnum.ADMIN,
      status: ProfileStatusEnum.STAFF,
      userId: user.id,
      institutionProfileId: user.roles[institutionId].id,
      institutionId: institutionId,
    });
    await this.commonService.saveEntity(this.profilesRepository, profile, true);
    return profile;
  }

  public async createProfile(
    user: IAccessUser,
    { courseId, profileId, role, status }: CreateProfileInput,
  ): Promise<CourseProfileEntity> {
    const course = await this.coursesService.courseById(user, courseId);
    const userRole = this.commonService.getUserRole(user, course.institutionId);

    switch (role) {
      case ProfileRoleEnum.ADMIN:
      case ProfileRoleEnum.STAFF:
      case ProfileRoleEnum.TEACHER:
        if (userRole !== ProfileRoleEnum.ADMIN)
          throw new UnauthorizedException(
            `You do not have permission to create an ${role.toLowerCase()} profile`,
          );
        if (status !== ProfileStatusEnum.STAFF)
          throw new BadRequestException(
            'Only staff profiles can be created with that role',
          );
        break;
      case ProfileRoleEnum.STUDENT:
        if (userRole === ProfileRoleEnum.STUDENT)
          throw new UnauthorizedException(
            'You cannot create a student profile',
          );
        if (status === ProfileStatusEnum.STAFF)
          throw new BadRequestException(
            'Staff profiles can not be created with that role',
          );
        break;
    }

    const messageProfile = await this.getMessageProfile(profileId);

    if (messageProfile.institutionId !== course.institutionId)
      throw new UnauthorizedException(
        'You do not have permission to create a profile for this institution',
      );

    const profile = this.profilesRepository.create({
      slug: this.commonService.generateSlug(messageProfile.userName),
      course: courseId,
      role,
      status,
      userId: messageProfile.userId,
      institutionProfileId: messageProfile.profileId,
      institutionId: messageProfile.institutionId,
    });
    await this.commonService.saveEntity(this.profilesRepository, profile, true);
    return profile;
  }

  public async updateProfileStatus(
    user: IAccessUser,
    { courseId, profileId, status }: UpdateProfileStatusDto,
  ): Promise<CourseProfileEntity> {
    const profile = await this.getProfileById(courseId, profileId);
    const role = this.commonService.getUserRole(user, profile.institutionId);

    if (role !== ProfileRoleEnum.ADMIN && role !== ProfileRoleEnum.STAFF)
      throw new UnauthorizedException(
        'You do not have permission to update this profile',
      );
    if (profile.role !== ProfileRoleEnum.STUDENT)
      throw new BadRequestException('Only students can be updated');

    profile.status = status;
    await this.commonService.saveEntity(this.profilesRepository, profile);
    return profile;
  }

  public async deleteProfile(
    user: IAccessUser,
    { courseId, profileId }: ProfileDto,
  ): Promise<LocalMessageType> {
    const profile = await this.getProfileById(courseId, profileId);
    const role = this.commonService.getUserRole(user, profile.institutionId);

    if (role !== ProfileRoleEnum.ADMIN)
      throw new UnauthorizedException(
        'You do not have permission to delete this profile',
      );

    await this.commonService.removeEntity(this.profilesRepository, profile);
    return new LocalMessageType('Profile deleted successfully');
  }

  public async profileById(
    user: IAccessUser,
    { courseId, profileId }: ProfileDto,
  ): Promise<CourseProfileEntity> {
    const profile = await this.getProfileById(courseId, profileId);
    this.commonService.getUserRole(user, profile.institutionId);
    return profile;
  }

  public async profileBySlug(
    user: IAccessUser,
    { courseId, slug }: ProfileSlugDto,
  ): Promise<CourseProfileEntity> {
    const profile = await this.profilesRepository.findOne({
      slug,
      course: courseId,
    });
    this.commonService.checkExistence('Course Profile', profile);
    this.commonService.getUserRole(user, profile.institutionId);
    return profile;
  }

  public async filterProfiles(
    user: IAccessUser,
    { courseId, order, first, after }: FilterProfilesDto,
  ): Promise<IPaginated<CourseProfileEntity>> {
    const course = await this.coursesService.courseById(user, courseId);
    const qb = this.profilesRepository
      .createQueryBuilder('cp')
      .where({ course });
    return this.commonService.queryBuilderPagination(
      'cp',
      'slug',
      first,
      order,
      qb,
      after,
    );
  }

  public async profileByUserId(
    userId: number,
    courseId: number,
  ): Promise<CourseProfileEntity> {
    const profile = await this.profilesRepository.findOne({
      userId,
      course: courseId,
    });
    this.commonService.checkExistence('Course Profile', profile);
    return profile;
  }

  public async checkProfileExistence(
    userId: number,
    courseId: number,
  ): Promise<void> {
    const count = await this.profilesRepository.count({
      userId,
      course: courseId,
    });

    if (count === 0)
      throw new UnauthorizedException('You are not a member of this course');
  }

  private async getProfileById(
    courseId: number,
    profileId: number,
  ): Promise<CourseProfileEntity> {
    const profile = await this.profilesRepository.findOne({
      course: courseId,
      id: profileId,
    });
    this.commonService.checkExistence('Course Profile', profile);
    return profile;
  }

  private async getMessageProfile(profileId: number): Promise<IMessageProfile> {
    const message = await this.commonService.throwInternalError(
      firstValueFrom(
        this.usersClient
          .send<IRedisMessage<IMessageProfile | string>>(
            { cmd: 'USER_PROFILE_BY_ID' },
            {
              apiId: this.coursesNamespace,
              profileId,
            },
          )
          .pipe(timeout(2000)),
      ),
    );

    if (message.status === 'error')
      throw new BadRequestException(message.message as string);

    return message.message as IMessageProfile;
  }
}
