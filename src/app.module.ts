import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';
import { GeneroModule } from './Domain/Arquitecture/genero/genero.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
    cache: true,
  }),
  GeneroModule,
  MongooseModule.forRoot(config().database.host)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
}
