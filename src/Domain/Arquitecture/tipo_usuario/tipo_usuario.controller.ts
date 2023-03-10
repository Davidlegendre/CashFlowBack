import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { TipoUsuarioService } from './tipo_usuario.service';

@Controller('tipo-usuario')
@UseGuards(APIKeyGuard)
export class TipoUsuarioController {

    constructor(private readonly tipoUsuarioService: TipoUsuarioService){}

    @Get('/all')
    async ObtenerTodo(): Promise<MensajeDTO>
    {
        const result = await this.tipoUsuarioService.ObtenerTodos();
        return {mensaje: "Tipos de Usuario", Data: result}
    }

    @Get('/one/:id')
    async ObtenerUno(@Param('id') id: string): Promise<MensajeDTO>
    {
        const result = await this.tipoUsuarioService.ObtenerUno(id)
        return {mensaje: "Tipo de Usuario", Data: result}
    }

    @Get('/porCode/:code')
    async ObtenerUnoPorCode(@Param('code') code: string): Promise<MensajeDTO>
    {
        const result = await this.tipoUsuarioService.ObtenerUnoPorCode(code)
        return {mensaje: "Tipo de Usuario", Data: result}
    }
}
