import { Type } from '@nestjs/common';
import { IPaginated } from '../../interfaces/paginated.interface';
export declare function Paginated<T>(classRef: Type<T>): Type<IPaginated<T>>;
