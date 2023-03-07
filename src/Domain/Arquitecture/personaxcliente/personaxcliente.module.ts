import { Module } from '@nestjs/common';
import { PersonaxclienteController } from './personaxcliente.controller';
import { PersonaxclienteService } from './personaxcliente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonaXCliente, PersonaXClienteSchema } from '../../schemas/PersonaXCliente-model';
import { PersonaModule } from '../persona/persona.module';

@Module({
  imports:[MongooseModule.forFeature([{
    name: PersonaXCliente.name,
    schema: PersonaXClienteSchema
  }]), PersonaModule],
  controllers: [PersonaxclienteController],
  providers: [PersonaxclienteService]
})
export class PersonaxclienteModule {}
