import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import { apikeyMiddleware } from './Domain/middlewares/apikey.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  await app.listen(config().port, () => {
    console.log("server on port http://localhost:3000")
  });
  app.use(apikeyMiddleware)
}
bootstrap();
