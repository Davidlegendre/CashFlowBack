import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { TipoIdentificacionService } from './tipo_identificacion.service';

@Controller('tipo-identificacion')
@UseGuards(APIKeyGuard)
export class TipoIdentificacionController {

    constructor(private readonly tipoIdentificacionService :TipoIdentificacionService){}

    @Get('/all')
    async ObtenerTodos(): Promise<MensajeDTO>
    {
        const result = await this.tipoIdentificacionService.ObtenerTodos()
        return {mensaje: "Tipos de Identificaciones", Data: result}
    }

    @Get('/one/:id')
    async ObtenerUno(@Param('id') id: string): Promise<MensajeDTO>
    {
        const result = await this.tipoIdentificacionService.ObtenerUno(id)
        return {mensaje: "Tipo de Identificacion", Data: result}
    }

}
