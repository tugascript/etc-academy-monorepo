import { RedisOptions } from 'ioredis';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { IJwt } from './jwt.interface';
import { IEmailConfig } from './email-config.interface';

export interface IConfig {
  port: number;
  redis: RedisOptions;
  email: IEmailConfig;
  throttler: ThrottlerModuleOptions;
  jwt: IJwt;
  testing: boolean;
  url: string;
}
