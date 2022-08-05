import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import { ioredisStore } from '@app/common/stores';

@Injectable()
export class CacheConfig implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    const ttl = this.configService.get<number>('ttl');

    return this.configService.get<boolean>('testing')
      ? { ttl }
      : {
          ttl,
          store: ioredisStore,
          redisInstance: new Redis(
            this.configService.get<RedisOptions>('redis'),
          ),
        };
  }
}
