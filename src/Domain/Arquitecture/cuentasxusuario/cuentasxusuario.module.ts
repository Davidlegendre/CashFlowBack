import { Module } from '@nestjs/common';
import { CuentasxusuarioService } from './cuentasxusuario.service';
import { CuentasxusuarioController } from './cuentasxusuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CuentasBancoXUsuario, CuentasBancoXUsuarioSchema } from '../../schemas/CuentaXUsuario-model';
import { PersonaModule } from '../persona/persona.module';
import { BancoModule } from '../banco/banco.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name: CuentasBancoXUsuario.name,
    schema: CuentasBancoXUsuarioSchema
  }]), PersonaModule, BancoModule],
  providers: [CuentasxusuarioService],
  controllers: [CuentasxusuarioController]
})
export class CuentasxusuarioModule {}
