import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Config} from './config/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(Config().port)
  await app.listen(Config().port, () => {
    console.log("server on http://localhost:" + Config().port)
  });
 
}
bootstrap();
