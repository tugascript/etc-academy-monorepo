import { RequestStatusEnum } from 'src/common/enums';
export declare abstract class RespondToProfileRequestInput {
    requestId: number;
    response: RequestStatusEnum;
}
