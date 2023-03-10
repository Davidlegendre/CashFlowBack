import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { TipoOrdenesService } from './tipo_ordenes.service';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel';
import { JWTAuthGuard } from '../../../Domain/GlobalGuards/JWTAuthGuard.guard';

@UseGuards(APIKeyGuard)
@UseGuards(JWTAuthGuard)
@Controller('tipo-ordenes')
export class TipoOrdenesController {
    constructor(private readonly tipoOrdenesService: TipoOrdenesService){}

    @Get('/all')
    async ObtenerTodos(): Promise<MensajeDTO>
    {
        const result = await this.tipoOrdenesService.ObtenerTodo()
        return {mensaje: "Tipo de Ordenes", Data: result}
    }

    @Get('/one/:id')
    async ObtenerUno(@Param('id') id: string): Promise<MensajeDTO>
    {
        const result = await this.tipoOrdenesService.ObtenerUno(id)
        return {mensaje: "Tipo de Orden", Data: result}
    }

}
