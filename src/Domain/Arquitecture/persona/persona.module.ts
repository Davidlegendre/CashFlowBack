import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Persona, PersonaSchema } from '../../schemas/Persona-model';
import { GeneroModule } from '../genero/genero.module';
import { TipoIdentificacionModule } from '../tipo_identificacion/tipo_identificacion.module';
import { EmpresaModule } from '../empresa/empresa.module';
import { TokenEmailModule } from '../token_email/token_email.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Persona.name,
    schema: PersonaSchema
  }]), GeneroModule, TipoIdentificacionModule, EmpresaModule, TokenEmailModule],
  controllers: [PersonaController],
  providers: [PersonaService],
  exports: [PersonaService]
})
export class PersonaModule {}
