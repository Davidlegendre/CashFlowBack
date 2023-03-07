import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CuentasBancoXUsuario, CuentasBancoXUsuarioDocument } from '../../schemas/CuentaXUsuario-model';
import { PersonaService } from '../persona/persona.service';
import { BancoService } from '../banco/banco.service';
import CuentaXUsuarioDTO from './dto/cuentaxusuario.dto';

@Injectable()
export class CuentasxusuarioService {

    constructor(@InjectModel(CuentasBancoXUsuario.name)private cuentaBancoXUsuarioModel: Model<CuentasBancoXUsuarioDocument>,
    private readonly personaService: PersonaService,
    private readonly bancoService: BancoService){}

    /*
        ver todas las cuentas del usuario activo,
        agregar cuentas del usuario activo,
        eliminar cuentas del usuario activo,
        actualizar cuentas del usuario activo
    */

    async ObtenerCuentas(idPersona: string)
    {
        await this.personaService.ObtenerUno(idPersona);
        const cuentas = await this.cuentaBancoXUsuarioModel.find({Persona_id: idPersona})
        if(cuentas.length === 0) throw new HttpException('No tiene cuentas',HttpStatus.NOT_FOUND)
        return cuentas
    }

    async ObtenerCuenta(idCuenta: string, idPersona: string)
    {
        await this.personaService.ObtenerUno(idPersona);
        const cuenta = await this.cuentaBancoXUsuarioModel.findOne({Persona_id: idPersona, _id: idCuenta})
        if(!cuenta) throw new HttpException('No se encontro la cuenta',HttpStatus.NOT_FOUND)
        return cuenta
    }

    async AgregarCuenta(cuentaXUsuarioDTO: CuentaXUsuarioDTO){
        
        await this.personaService.ObtenerUno(cuentaXUsuarioDTO.persona_id)
        await this.bancoService.ObtenerUnSoloBanco(cuentaXUsuarioDTO.banco_id)        
        if(cuentaXUsuarioDTO.numerocuenta.length !== 11) throw new HttpException('el numero de cuenta debe tener 11 digitos',HttpStatus.UNPROCESSABLE_ENTITY)
        const exist = await this.cuentaBancoXUsuarioModel.findOne({numerocuenta: cuentaXUsuarioDTO.numerocuenta, Persona_id: cuentaXUsuarioDTO.persona_id})
        if(exist) throw new HttpException('La cuenta de banco ya existe',HttpStatus.AMBIGUOUS)
        return await this.cuentaBancoXUsuarioModel.create({
            Persona_id: cuentaXUsuarioDTO.persona_id,
            Banco_Id: cuentaXUsuarioDTO.banco_id,
            numerocuenta: cuentaXUsuarioDTO.numerocuenta
        })
    }

    async ActualizarCuenta(cuentaXUsuarioDTO: CuentaXUsuarioDTO, id: string)
    {
        await this.personaService.ObtenerUno(cuentaXUsuarioDTO.persona_id)
        await this.bancoService.ObtenerUnSoloBanco(cuentaXUsuarioDTO.banco_id)
        if(cuentaXUsuarioDTO.numerocuenta.length !== 11) throw new HttpException('el numero de cuenta debe tener 11 digitos',HttpStatus.UNPROCESSABLE_ENTITY)
        const exist = await this.cuentaBancoXUsuarioModel.findOne({numerocuenta: cuentaXUsuarioDTO.numerocuenta, Persona_id: cuentaXUsuarioDTO.persona_id})
        if(exist) throw new HttpException('La cuenta de banco ya existe',HttpStatus.AMBIGUOUS)
        const result =  await this.cuentaBancoXUsuarioModel.findOneAndUpdate({_id: id, Persona_id: cuentaXUsuarioDTO.persona_id},{
            Persona_id: cuentaXUsuarioDTO.persona_id,
            Banco_Id: cuentaXUsuarioDTO.banco_id,
            numerocuenta: cuentaXUsuarioDTO.numerocuenta
        })

        if(!result) throw new HttpException('Cuenta de banco no actualizada',HttpStatus.NOT_MODIFIED)

        return result
    }

    async EliminarCuenta(idPersona: string, idCuenta: string)
    {
        await this.personaService.ObtenerUno(idPersona)
        const cuenta = await this.cuentaBancoXUsuarioModel.findOne({_id:idCuenta, Persona_id: idPersona})
        if(!cuenta) throw new HttpException('No existe esa cuenta',HttpStatus.NOT_FOUND)
        return await this.cuentaBancoXUsuarioModel.remove(cuenta._id)
    }

    async EliminarTodo(idPersona: string)
    {
        await this.personaService.ObtenerUno(idPersona)
        await this.ObtenerCuentas(idPersona)        
        return await this.cuentaBancoXUsuarioModel.deleteMany({Persona_id: idPersona})
    }
}
