import { LocalBaseEntity } from '../../common/entities';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
import { DocumentTypeEnum } from '../../uploader/enums';
import { IResource } from '../interfaces/resouce.interface';
export declare class ResourceEntity extends LocalBaseEntity implements IResource {
    link: string;
    resourceType: DocumentTypeEnum;
    title: string;
    info?: string;
    lesson: LessonEntity;
}
