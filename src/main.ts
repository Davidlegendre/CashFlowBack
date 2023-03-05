import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Config} from './config/config';
import { addMilisecondsToDate, getDateNow } from './Domain/Helpers/Time.helper';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Config().port, () => {
    console.log("server on http://localhost:" + Config().port)
  });
 
}
bootstrap();
