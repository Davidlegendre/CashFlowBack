import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { JWTAuthGuard } from '../../GlobalGuards/JWTAuthGuard.guard';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel';
import { PersonaxclienteService } from './personaxcliente.service';
import PersonaXClienteDTO from './dto/personaxcliente.dto';
import { RolesGuard } from '../../GlobalGuards/Role.guard';
import { Roles } from '../../GlobalGuards/role.decorator';
import { rol } from '../tipo_usuario/enums/tipousuario.enum';

@UseGuards(APIKeyGuard)
@Controller('personaxcliente')
export class PersonaxclienteController {

    constructor(private readonly personaxclienteService: PersonaxclienteService){}

    @Roles(rol.Dueño, rol.Administrador, rol.Gestor)
    @UseGuards(JWTAuthGuard, RolesGuard)
    @Get('/all/:idPersona')
    async ObtenerTodos(@Param('idPersona')idPersona: string): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.ObtenerTodos(idPersona)
        return {mensaje: "Personas", Data: result}
    }

    @Roles(rol.Dueño, rol.Administrador, rol.Gestor)
    @UseGuards(JWTAuthGuard, RolesGuard)
    @Get('/one/:idpersona/:idcliente')
    async ObtenerUno(@Param() {idpersona, idcliente}: PersonaXClienteDTO): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.ObtenerCliente(idpersona, idcliente)
        return {mensaje: "Persona", Data: result}
    }

    @Roles(rol.Dueño, rol.Administrador, rol.Gestor)
    @UseGuards(JWTAuthGuard, RolesGuard)
    @Post('/agregar')
    async AgregarCliente(@Body() personaxclienteDto: PersonaXClienteDTO): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.AgregarCliente(personaxclienteDto.idpersona, personaxclienteDto.idcliente)
        return {mensaje: "Cliente agregado", Data: result}
    }

    @Roles(rol.Dueño, rol.Administrador, rol.Gestor)
    @UseGuards(JWTAuthGuard, RolesGuard)
    @Post('/eliminar/:idpersona/:idcliente')
    async EliminarCliente(@Param() {idpersona, idcliente}: PersonaXClienteDTO): Promise<MensajeDTO>
    {
        const result = await this.personaxclienteService.EliminarCliente(idpersona, idcliente)
        return {mensaje: "Cliente eliminado", Data: result}
    }

}
