import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel';
import { APIKeyGuard } from '../../../Domain/GlobalGuards/Guard.global';
import { EstadoService } from './estado.service';
import { JWTAuthGuard } from '../../GlobalGuards/JWTAuthGuard.guard';

@UseGuards(JWTAuthGuard)
@UseGuards(APIKeyGuard)
@Controller('estado')
export class EstadoController {

    constructor(private readonly estadoService: EstadoService){}

    @Get('/all')
    async ObtenerTodos(): Promise<MensajeDTO>
    {
        const result = await this.estadoService.ObtenerTodos();
        return {mensaje: "Estados", Data: result}
    }

    @Get('/one/:id')
    async ObtenerUno(@Param('id') id: string) : Promise<MensajeDTO>
    {
        const result = await this.estadoService.ObtenerUnEstado(id)
        return {mensaje: "Estado", Data: result}
    }

    @Get('/porNum/:num')
    async ObtenerUnoPorNum(@Param('num') num: number): Promise<MensajeDTO>
    {
        const result = await this.estadoService.ObtenerUnEstadoPorNumero(num)
        return {mensaje: "Estado", Data: result}
    }


}
