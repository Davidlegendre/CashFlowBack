import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from '../../../Domain/schemas/Usuario-model';
import { PersonaModule } from '../persona/persona.module';
import { TokenEmailModule } from '../token_email/token_email.module';
import { TipoUsuarioModule } from '../tipo_usuario/tipo_usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmpresaModule } from '../empresa/empresa.module';
import { Persona } from '../../../Domain/schemas/Persona-model';
import { PersonaSchema } from '../../schemas/Persona-model';
import { PersonaxclienteModule } from '../personaxcliente/personaxcliente.module';
import { GeneroModule } from '../genero/genero.module';
import { TipoIdentificacionModule } from '../tipo_identificacion/tipo_identificacion.module';

@Module({
  imports:[MongooseModule.forFeature([{
        name: Usuario.name,
        schema: UsuarioSchema,
  },{
    name: Persona.name,
    schema: PersonaSchema,
  }]),TipoUsuarioModule,PersonaModule, TokenEmailModule, EmpresaModule,PersonaxclienteModule,
  GeneroModule,TipoIdentificacionModule,
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_KEY'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService]
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
