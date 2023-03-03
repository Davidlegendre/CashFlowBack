import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneroModule } from './Domain/Arquitecture/genero/genero.module';
import { ConfigModule } from '@nestjs/config';
import { BancoModule } from './Domain/Arquitecture/banco/banco.module';
import { Config } from './config/config';
import { EmpresaModule } from './Domain/Arquitecture/empresa/empresa.module';
require('dotenv').config()

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true
  }),
   GeneroModule,
   BancoModule,
   EmpresaModule,
   MongooseModule.forRoot(Config().database.host)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
}
