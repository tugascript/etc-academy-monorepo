import { PaginationDto } from 'src/common/dtos';
import { RequestStatusEnum, RequestUserEnum } from 'src/common/enums';
export declare abstract class FilterProfileRequestsDto extends PaginationDto {
    status?: RequestStatusEnum;
    userType: RequestUserEnum;
}
