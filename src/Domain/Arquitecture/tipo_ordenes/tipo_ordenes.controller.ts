import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { TipoOrdenesService } from './tipo_ordenes.service';
import { MensajeDTO } from 'src/Domain/DTOGlobal/MensajeModel';

@Controller('tipo-ordenes')
@UseGuards(APIKeyGuard)
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
