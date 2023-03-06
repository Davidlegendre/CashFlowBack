import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoUsuarioController } from './tipo_usuario.controller';
import { TipoUsuarioService } from './tipo_usuario.service';
import { Tipo_Usuario, Tipo_UsuarioSchema } from '../../schemas/Tipo-usuario-model';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Tipo_Usuario.name,
    schema: Tipo_UsuarioSchema,
    collection: 'Tipo_Usuario'
  }])],
  controllers: [TipoUsuarioController],
  providers: [TipoUsuarioService],
  exports: [TipoUsuarioService]
})
export class TipoUsuarioModule {}
