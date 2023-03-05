import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Empresa, EmpresaSchema } from '../../schemas/Empresa-model';
import { TokenEmailModule } from '../token_email/token_email.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Empresa.name,
    schema: EmpresaSchema,
    collection: 'Empresa'
  }]), TokenEmailModule],
  providers: [EmpresaService],
  controllers: [EmpresaController],
  exports: [EmpresaService]
})
export class EmpresaModule {}
