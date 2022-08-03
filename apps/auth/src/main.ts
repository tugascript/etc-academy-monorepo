import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';
import mercuriusUpload from 'mercurius-upload';
import { UploadOptions } from 'graphql-upload';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RedisOptions } from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const testing = configService.get<boolean>('testing');
  app.register(fastifyCors, {
    credentials: true,
    origin: configService.get<string>('url'),
  });
  app.register(fastifyCookie, {
    secret: configService.get<string>('COOKIE_SECRET'),
  });
  app.register(fastifyCsrf, { cookieOpts: { signed: true } });
  app.register(mercuriusUpload, configService.get<UploadOptions>('upload'));
  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'public'),
    decorateReply: !testing,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: configService.get<RedisOptions>('redis'),
  });
  await app.startAllMicroservices();
  await app.listen(
    configService.get<number>('port'),
    testing ? '127.0.0.1' : '0.0.0.0',
  );
}

bootstrap();
