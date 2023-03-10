import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel'; 

@Controller('genero')
@UseGuards(APIKeyGuard)
export class GeneroController {

    constructor(private generoservice: GeneroService){}

    @Get('/all')
    async GetAllGeneros(): Promise<MensajeDTO>
    {        
        const result = await this.generoservice.ObtenerTodosLosGeneros()
        return {mensaje: "Lista de Generos", Data: result}
    }

    @Get('/one/:id')
    async getOneGenero(@Param('id') id: string): Promise<MensajeDTO>
    {
        const result = await this.generoservice.ObtenerUnGenero(id)
        return {mensaje: "Genero", Data: result}
    }
}
