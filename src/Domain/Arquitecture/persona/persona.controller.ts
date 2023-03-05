import { Controller, Get, UseGuards } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { MensajeDTO } from 'src/Domain/DTOGlobal/MensajeModel';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';

@Controller('persona')
@UseGuards(APIKeyGuard)
export class PersonaController {

    constructor(private readonly personaService: PersonaService){}

    @Get('/all')
    async ObtenerTodo(): Promise<MensajeDTO>
    {
        const result = await this.personaService.ObenerTodo()
        return {mensaje: "Personas", Data: result};
    }

}
