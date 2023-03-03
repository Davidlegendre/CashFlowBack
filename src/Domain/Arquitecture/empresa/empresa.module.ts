import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Empresa, EmpresaSchema } from '../../schemas/Empresa-model';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Empresa.name,
    schema: EmpresaSchema,
    collection: 'Empresa'
  }])],
  providers: [EmpresaService],
  controllers: [EmpresaController]
})
export class EmpresaModule {}
