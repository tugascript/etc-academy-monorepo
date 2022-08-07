import { Type } from '@nestjs/common';
import { IEdge } from '../../interfaces/paginated.interface';
export declare function Edge<T>(classRef: Type<T>): Type<IEdge<T>>;
