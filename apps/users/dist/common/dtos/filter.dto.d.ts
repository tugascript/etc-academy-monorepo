import { QueryCursorEnum } from '../enums/query-cursor.enum';
import { OrderDto } from './order.dto';
export declare abstract class FilterDto extends OrderDto {
    cursor: QueryCursorEnum;
}
