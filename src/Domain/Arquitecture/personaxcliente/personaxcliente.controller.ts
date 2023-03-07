import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { JWTAuthGuard } from '../../GlobalGuards/JWTAuthGuard.guard';
import { MensajeDTO } from 'src/Domain/DTOGlobal/MensajeModel';
import { PersonaxclienteService } from './personaxcliente.service';
import PersonaXClienteDTO from './dto/personaxcliente.dto';

@UseGuards(APIKeyGuard)
@UseGuards(JWTAuthGuard)
@Controller('personaxcliente')
export class PersonaxclienteController {

    constructor(private readonly personaxclienteService: PersonaxclienteService){}

    @Get('/all/:idPersona')
    async ObtenerTodos(@Param('idPersona')idPersona: string): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.ObtenerTodos(idPersona)
        return {mensaje: "Personas", Data: result}
    }

    @Get('/one/:idpersona/:idcliente')
    async ObtenerUno(@Param() {idpersona, idcliente}: PersonaXClienteDTO): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.ObtenerCliente(idpersona, idcliente)
        return {mensaje: "Persona", Data: result}
    }

    @Post('/agregar')
    async AgregarCliente(@Body() personaxclienteDto: PersonaXClienteDTO): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.AgregarCliente(personaxclienteDto.idpersona, personaxclienteDto.idcliente)
        return {mensaje: "Cliente agregado", Data: result}
    }

    @Post('/eliminar/:idpersona/:idcliente')
    async EliminarCliente(@Param() {idpersona, idcliente}: PersonaXClienteDTO): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.EliminarCliente(idpersona, idcliente)
        return {mensaje: "Cliente eliminado", Data: result}
    }

}
