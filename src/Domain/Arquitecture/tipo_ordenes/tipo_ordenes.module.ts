import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoOrdenesController } from './tipo_ordenes.controller';
import { TipoOrdenesService } from './tipo_ordenes.service';
import { Tipo_Ordenes, Tipo_OrdenesSchema } from '../../schemas/Tipo-ordenes-model';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Tipo_Ordenes.name,
    schema: Tipo_OrdenesSchema,
    collection: 'Tipo_Ordenes'
  }])],
  controllers: [TipoOrdenesController],
  providers: [TipoOrdenesService]
})
export class TipoOrdenesModule {}
