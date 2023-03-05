import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Persona, PersonaSchema } from '../../schemas/Persona-model';
import { GeneroService } from '../genero/genero.service';
import { TipoIdentificacionService } from '../tipo_identificacion/tipo_identificacion.service';
import { EmpresaService } from '../empresa/empresa.service';
import { GeneroModule } from '../genero/genero.module';
import { TipoIdentificacionModule } from '../tipo_identificacion/tipo_identificacion.module';
import { EmpresaModule } from '../empresa/empresa.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Persona.name,
    schema: PersonaSchema
  }]), GeneroModule, TipoIdentificacionModule, EmpresaModule],
  controllers: [PersonaController],
  providers: [PersonaService],
  exports: [PersonaService]
})
export class PersonaModule {}
