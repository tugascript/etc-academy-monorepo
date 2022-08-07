import { IBase } from '../../common/interfaces';
import { ILesson } from '../../lessons/interfaces/lesson.interface';
import { DocumentTypeEnum } from '../../uploader/enums';

export interface IResource extends IBase {
  title: string;
  link: string;
  resourceType: DocumentTypeEnum;
  info?: string;
  lesson: ILesson;
}
