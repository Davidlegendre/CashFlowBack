import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneroModule } from './Domain/Arquitecture/genero/genero.module';
import { ConfigModule } from '@nestjs/config';
import { BancoModule } from './Domain/Arquitecture/banco/banco.module';
import { Config } from './config/config';
import { EstadoModule } from './Domain/Arquitecture/estado/estado.module';
import { TipoOrdenesModule } from './Domain/Arquitecture/tipo_ordenes/tipo_ordenes.module';
import { TipoUsuarioModule } from './Domain/Arquitecture/tipo_usuario/tipo_usuario.module';
import { TipoIdentificacionModule } from './Domain/Arquitecture/tipo_identificacion/tipo_identificacion.module';
import SwaggerCustom from 'src/Domain/Views/index';
import { TokenEmailModule } from './Domain/Arquitecture/token_email/token_email.module';
import { EmpresaModule } from './Domain/Arquitecture/empresa/empresa.module';
import { TokenEmailService } from './Domain/Arquitecture/token_email/token_email.service';
import { PersonaModule } from './Domain/Arquitecture/persona/persona.module';
import { GeneroService } from './Domain/Arquitecture/genero/genero.service';
import { TipoIdentificacionService } from './Domain/Arquitecture/tipo_identificacion/tipo_identificacion.service';
import { EmpresaService } from './Domain/Arquitecture/empresa/empresa.service';
import { PersonaService } from './Domain/Arquitecture/persona/persona.service';
import { AuthModule } from './Domain/Arquitecture/auth/auth.module';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtStrategy } from './config/jwt.strategy';
require('dotenv').config()

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true
  }),
   GeneroModule,
   BancoModule,
   EstadoModule,
   TipoOrdenesModule,
   TipoUsuarioModule,
   TipoIdentificacionModule,   
   EmpresaModule,
   TokenEmailModule,
   PersonaModule,
   AuthModule,
   MongooseModule.forRoot(Config().database.host)],
  controllers: [AppController],
  providers: [AppService, SwaggerCustom, JwtStrategy],
})
export class AppModule{
}
