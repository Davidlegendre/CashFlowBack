import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/Domain/schemas/Usuario-model';
import { PersonaModule } from '../persona/persona.module';
import { TokenEmailModule } from '../token_email/token_email.module';
import { TipoUsuarioModule } from '../tipo_usuario/tipo_usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/config/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[MongooseModule.forFeature([{
        name: Usuario.name,
        schema: UsuarioSchema,
  }]),TipoUsuarioModule,PersonaModule, TokenEmailModule, 
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
