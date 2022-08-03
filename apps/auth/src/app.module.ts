import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation';
import { config } from './config/config';
import { CacheConfig } from './config/cache.config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useClass: CacheConfig,
    }),
    EmailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
