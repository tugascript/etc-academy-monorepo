import { LocalMessageType } from '../common/entities/gql';
import { IAccessUser, IPaginated, IReference } from '../common/interfaces';
import { FilterLessonsDto } from './dtos/filter-lessons.dto';
import { LessonDto } from './dtos/lesson.dto';
import { UpdateLessonLinkDto } from './dtos/update-lesson-link.dto';
import { UpdateLessonTimeDto } from './dtos/update-lesson-time.dto';
import { UpdateLessonTitleDto } from './dtos/update-lesson-title.dto';
import { UpdateLessonTypeDto } from './dtos/update-lesson-type.dto';
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { LessonsService } from './lessons.service';
export declare class LessonsResolver {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    createLesson(user: IAccessUser, input: CreateLessonInput): Promise<LessonEntity>;
    updateLessonLink(user: IAccessUser, dto: UpdateLessonLinkDto): Promise<LessonEntity>;
    updateLessonTime(user: IAccessUser, dto: UpdateLessonTimeDto): Promise<LessonEntity>;
    updateLessonTitle(user: IAccessUser, dto: UpdateLessonTitleDto): Promise<LessonEntity>;
    updateLessonType(user: IAccessUser, dto: UpdateLessonTypeDto): Promise<LessonEntity>;
    deleteLesson(user: IAccessUser, dto: LessonDto): Promise<LocalMessageType>;
    lessonById(user: IAccessUser, dto: LessonDto): Promise<LessonEntity>;
    filterLessons(user: IAccessUser, dto: FilterLessonsDto): Promise<IPaginated<LessonEntity>>;
    resolveReference(_: IReference): void;
    getResources(): Promise<void>;
}
