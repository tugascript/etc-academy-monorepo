import { NestFactory } from '@nestjs/core';
import { ClassesModule } from './classes.module';

async function bootstrap() {
  const app = await NestFactory.create(ClassesModule);
  await app.listen(3000);
}
bootstrap();
