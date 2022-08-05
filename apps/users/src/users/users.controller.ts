import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dtos/register.dto';
import { ExceptionFilter } from './filters/exception.filter';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { IApiId } from './interfaces/api-id.interface';
import { ApiUserIdDto } from './dtos/api-user-id.dto';
import { ApiUserEmailDto } from './dtos/api-user-email.dto';
import { UserEntity } from './entities/user.entity';
import { IMessageUser, IRedisMessage } from '@app/common/interfaces';
import { LoginDto } from './dtos/login.dto';
import { RedisMessageDto } from '@app/common/dtos';
import { UserPayloadDto } from './dtos/user-payload.dto';

@UseFilters(new ExceptionFilter())
@Controller()
export class UsersController {
  private readonly authUUID = this.configService.get<string>('AUTH_UUID');

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @MessagePattern({ cmd: 'CREATE_USER' })
  public async createUser(
    dto: RegisterDto,
  ): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.createUser(dto);
    return this.transformUser(user);
  }

  @MessagePattern({ cmd: 'CONFIRM_USER' })
  public async confirmUser(
    dto: UserPayloadDto,
  ): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.confirmUser(dto);
    return this.transformUser(user);
  }

  @MessagePattern({ cmd: 'LOGIN_USER' })
  public async loginUser(dto: LoginDto): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.loginUser(dto);
    return this.transformUser(user);
  }

  @MessagePattern({ cmd: 'CHANGE_USER_PASSWORD' })
  public async changePassword(
    dto: ChangePasswordDto,
  ): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.changePassword(dto);
    return this.transformUser(user);
  }

  @MessagePattern({ cmd: 'UPDATE_USER_PASSWORD' })
  public async updatePassword(
    dto: UpdatePasswordDto,
  ): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.updatePassword(dto);
    return this.transformUser(user);
  }

  @MessagePattern({ cmd: 'USER_BY_ID' })
  public async userById(
    dto: ApiUserIdDto,
  ): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.userByIdForAuth(dto.userId);
    return this.transformUser(user);
  }

  @MessagePattern({ cmd: 'USER_BY_EMAIL' })
  public async userByEmail(
    dto: ApiUserEmailDto,
  ): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.userByEmailForAuth(dto.email);
    return this.transformUser(user);
  }

  @MessagePattern({ cmd: 'USER_BY_PAYLOAD' })
  public async userByPayload(
    dto: UserPayloadDto,
  ): Promise<IRedisMessage<IMessageUser>> {
    this.checkApi(dto);
    const user = await this.usersService.userByPayload(dto.userId, dto.count);
    return this.transformUser(user);
  }

  private checkApi<T extends IApiId>(dto: T) {
    if (dto.apiId !== this.authUUID) throw new RpcException('Unauthorized');
  }

  private transformUser(user: UserEntity): IRedisMessage<IMessageUser> {
    const messageUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      picture: user.picture,
      count: user.credentials.version,
      twoFactor: user.twoFactor,
      lastOnline: user.lastOnline,
      lastLogin: user.lastLogin,
      confirmed: user.confirmed,
      suspended: user.suspended,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return new RedisMessageDto(messageUser);
  }
}
