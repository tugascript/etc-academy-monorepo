import { Type } from '@nestjs/common';
import { IChange } from '../../interfaces/change.interface';
export declare function Change<T>(classRef: Type<T>): Type<IChange<T>>;
