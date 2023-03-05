import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Estado } from 'src/Domain/schemas/Estado_Model';
import { EstadoController } from './estado.controller';
import { EstadoService } from './estado.service';
import { EstadoSchema } from '../../schemas/Estado_Model';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Estado.name,
    schema: EstadoSchema,
    collection: 'Estado'
  }])],
  controllers: [EstadoController],
  providers: [EstadoService]
})
export class EstadoModule {}
