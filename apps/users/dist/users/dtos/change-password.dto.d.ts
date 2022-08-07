import { IApiId } from '../interfaces/api-id.interface';
import { UserPayloadDto } from './user-payload.dto';
export declare abstract class ChangePasswordDto extends UserPayloadDto implements IApiId {
    password1: string;
    password2: string;
}
