import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { CommonModule } from 'src/common';
import { ThrottlerConfig } from '../config/throttler.config';
import { UserClientConfig } from '../config/user-client.config';
import { EmailModule } from '../email/email.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
        useClass: UserClientConfig,
      },
    ]),
    CommonModule,
    EmailModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
