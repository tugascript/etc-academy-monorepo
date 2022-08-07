import { ConfigService } from '@nestjs/config';
import { IMessageUser, IRedisMessage } from '../common/interfaces';
import { ApiUserEmailDto } from './dtos/api-user-email.dto';
import { ApiUserIdDto } from './dtos/api-user-id.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserPayloadDto } from './dtos/user-payload.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly configService;
    private readonly authUUID;
    constructor(usersService: UsersService, configService: ConfigService);
    createUser(dto: RegisterDto): Promise<IRedisMessage<IMessageUser>>;
    confirmUser(dto: UserPayloadDto): Promise<IRedisMessage<IMessageUser>>;
    loginUser(dto: LoginDto): Promise<IRedisMessage<IMessageUser>>;
    changePassword(dto: ChangePasswordDto): Promise<IRedisMessage<IMessageUser>>;
    updatePassword(dto: UpdatePasswordDto): Promise<IRedisMessage<IMessageUser>>;
    userById(dto: ApiUserIdDto): Promise<IRedisMessage<IMessageUser>>;
    userByEmail(dto: ApiUserEmailDto): Promise<IRedisMessage<IMessageUser>>;
    userByPayload(dto: UserPayloadDto): Promise<IRedisMessage<IMessageUser>>;
    private checkApi;
    private transformUser;
}
