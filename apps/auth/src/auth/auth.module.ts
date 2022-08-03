import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { EmailModule } from '../email/email.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ThrottlerConfig } from '../config/throttler.config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisOptions } from 'ioredis';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfig,
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'USER_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: configService.get<RedisOptions>('redis'),
        }),
      },
    ]),
    EmailModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
