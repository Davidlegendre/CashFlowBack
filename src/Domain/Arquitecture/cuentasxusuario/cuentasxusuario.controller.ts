import { Body, Controller, Get, Param, Paramtype, Post, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { JWTAuthGuard } from '../../GlobalGuards/JWTAuthGuard.guard';
import { MensajeDTO } from 'src/Domain/DTOGlobal/MensajeModel'; 
import { CuentasxusuarioService } from './cuentasxusuario.service';
import CuentaXUsuarioDTO from './dto/cuentaxusuario.dto';

@UseGuards(APIKeyGuard)
@UseGuards(JWTAuthGuard)
@Controller('cuentasxusuario')
export class CuentasxusuarioController {

    constructor(private readonly cuentaXUsuarioService: CuentasxusuarioService){}

    @Get('/all/:idPersona')
    async ObtenerTodasCuentasDelUsuario(@Param('idPersona') idPersona: string): Promise<MensajeDTO>
    {
        const result = await this.cuentaXUsuarioService.ObtenerCuentas(idPersona)
        return {mensaje: "Cuentas", Data: result}
    }
    
    @Get('/one/:idPersona/:idCuenta')
    async ObtenerCuenta(@Param() {idPersona, idCuenta }): Promise<MensajeDTO>
    {
        console.log(idPersona)
        const result = await this.cuentaXUsuarioService.ObtenerCuenta(idCuenta, idPersona)
       
        return {
            mensaje: "Cuenta", Data: result
        }
    }

    @Post('/crear')
    async CrearCuenta(@Body() cuentaXUsuarioDTO: CuentaXUsuarioDTO): Promise<MensajeDTO>
    {
        const result = await this.cuentaXUsuarioService.AgregarCuenta(cuentaXUsuarioDTO)
        return {mensaje: "Cuenta Agregada", Data: result}
    }

    @Post('/actualizar/:idCuenta')
    async ActualizarCuente(@Body() cuentaXUsuarioDTO: CuentaXUsuarioDTO, @Param('idCuenta')idCuenta: string): Promise<MensajeDTO>
    {
        const result = await this.cuentaXUsuarioService.ActualizarCuenta(cuentaXUsuarioDTO, idCuenta)
        return {mensaje: "Cuenta Actualizada", Data: result}
    }

    @Post('/eliminar/:idPersona/:idCuenta')
    async EliminarCuenta(@Param() {idPersona, idCuenta }): Promise<MensajeDTO>
    {
        const result = await this.cuentaXUsuarioService.EliminarCuenta(idPersona, idCuenta)
        return {mensaje: "Cuenta eliminada", Data: result}
    }


    @Post('/eliminarTodo/:idPersona')
    async EliminarTodo(@Param('idPersona') idPersona: string): Promise<MensajeDTO>
    {
        const result = await this.cuentaXUsuarioService.EliminarTodo(idPersona)
        return {mensaje:"Cuentas de banco eliminadas", Data: result}
    }

    

}
