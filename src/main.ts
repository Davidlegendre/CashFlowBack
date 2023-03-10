import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Config} from './config/config';
import { RolesGuard } from './Domain/GlobalGuards/Role.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Config().port, () => {
    console.log("server on http://localhost:" + Config().port)
  });
 
}
bootstrap();
