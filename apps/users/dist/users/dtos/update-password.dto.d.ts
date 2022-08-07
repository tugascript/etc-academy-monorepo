import { IApiId } from '../interfaces/api-id.interface';
import { ApiUserIdDto } from './api-user-id.dto';
export declare abstract class UpdatePasswordDto extends ApiUserIdDto implements IApiId {
    password: string;
    password1: string;
    password2: string;
}
