import { Module } from '@nestjs/common';
import { TipoIdentificacionService } from './tipo_identificacion.service';
import { TipoIdentificacionController } from './tipo_identificacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tipo_Identificacion, Tipo_IdentificacionSchema } from '../../schemas/Tipo-identificacion-model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Tipo_Identificacion.name,
      schema: Tipo_IdentificacionSchema,
      collection: 'Tipo_Identificacion'
    }])
  ],
  providers: [TipoIdentificacionService],
  controllers: [TipoIdentificacionController],
  exports: [TipoIdentificacionService]
})
export class TipoIdentificacionModule {}
