import { ApiIdDto } from './api-id.dto';
import { IApiId } from '../interfaces/api-id.interface';
export declare abstract class LoginDto extends ApiIdDto implements IApiId {
    email: string;
    password: string;
}
