import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';
import { RedisOptions } from 'ioredis';

@Injectable()
export class UserClientConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createClientOptions(): ClientProvider {
    return {
      transport: Transport.REDIS,
      options: this.configService.get<RedisOptions>('redis'),
    };
  }
}
