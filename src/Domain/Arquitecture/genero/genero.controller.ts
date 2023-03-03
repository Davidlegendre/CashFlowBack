import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { Genero } from 'src/Domain/schemas/Genero-model';
import { GeneroService } from './genero.service';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';

@Controller('genero')
@UseGuards(APIKeyGuard)
export class GeneroController {

    constructor(private generoservice: GeneroService){}

    @Get('/all')
    async GetAllGeneros(): Promise<Genero[]>
    {
        return await this.generoservice.ObtenerTodosLosGeneros();
    }

    @Get('/one/:id')
    async getOneGenero(@Param('id') id: string): Promise<Genero>
    {
        return await this.generoservice.ObtenerUnGenero(id)
    }
}
