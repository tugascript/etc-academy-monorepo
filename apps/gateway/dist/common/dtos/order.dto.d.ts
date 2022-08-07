import { QueryOrderEnum } from '../enums/query-order.enum';
import { PaginationDto } from './pagination.dto';
export declare abstract class OrderDto extends PaginationDto {
    order: QueryOrderEnum;
}
