import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PersonaXCliente } from '../../schemas/PersonaXCliente-model';
import { Model } from 'mongoose';
import { PersonaXClienteDocument } from '../../schemas/PersonaXCliente-model'; 
import { PersonaService } from '../persona/persona.service';
import mongoose from 'mongoose';


@Injectable()
export class PersonaxclienteService {

    constructor(@InjectModel(PersonaXCliente.name)private personaxclienteModel: Model<PersonaXClienteDocument>,
    private readonly personaService: PersonaService){}

    //obtener los clientes de cada persona admin o gestor con su id
    //obtener el cliente con idcliente e idpersona
    //agregar cliente siempre y cuando no sean iguales
    //no duplicar clientes en el mismo idpersona
    //los clientes se dasactivan  por el mismo usuario

    ObtenerTodosenBruto(idPersona: string){
        let ids: mongoose.Types.ObjectId[]
        this.GetDatos(idPersona).then(e=> ids = e)
        const personas = this.personaService.ObtenerTodoIncludeenBruto(ids)
        return personas
    }

    async GetDatos(idPersona: string){
        await this.personaService.ObtenerUno(idPersona)
        const result = await this.personaxclienteModel.find({PersonaAdminOGestor_id: idPersona})
        if(result.length === 0) throw new HttpException('No tiene Clientes',HttpStatus.NOT_FOUND)

        const ids = result.map(e=> {
            return new mongoose.Types.ObjectId(e.PersonaCliente_id)
        })
        return ids
    }

    async ObtenerTodos(idPersona: string){
        await this.personaService.ObtenerUno(idPersona)
        const result = await this.personaxclienteModel.find({PersonaAdminOGestor_id: idPersona})
        if(result.length === 0) throw new HttpException('No tiene Clientes',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerCliente(idpersona: string, idcliente: string): Promise<PersonaXCliente>
    {
        await this.personaService.ObtenerUno(idpersona)
        const result = await this.personaxclienteModel.findOne({PersonaAdminOGestor_id: idpersona, PersonaCliente_id: idcliente})
        if(!result) throw new HttpException('No existe ese cliente',HttpStatus.NOT_FOUND)
        return result
    }

    async AgregarCliente(idpersona: string, idcliente: string): Promise<PersonaXCliente>
    {
        if(idpersona === idcliente) throw new HttpException('Persona no puede ser el mismo cliente',HttpStatus.AMBIGUOUS)
        await this.personaService.ObtenerUno(idpersona)
        await this.personaService.ObtenerUno(idcliente)
        

        const duplicated = await this.personaxclienteModel.findOne({PersonaAdminOGestor_id: idpersona, PersonaCliente_id: idcliente})
        if(duplicated) throw new HttpException('Ya existe un cliente igual',HttpStatus.AMBIGUOUS)

        const result = await this.personaxclienteModel.create({PersonaAdminOGestor_id: idpersona, PersonaCliente_id: idcliente})
        if(!result) throw new HttpException('Cliente no pudo agregarse',HttpStatus.NOT_MODIFIED)
        return result
    }

    async EliminarCliente(idpersona: string, idcliente: string): Promise<PersonaXCliente>
    {
        if(idpersona === idcliente) throw new HttpException('Persona no puede ser el mismo cliente',HttpStatus.AMBIGUOUS)
        await this.personaService.ObtenerUno(idpersona)
        const exist = await this.personaxclienteModel.findOne({PersonaAdminOGestor_id: idpersona, PersonaCliente_id: idcliente})
        if(!exist) throw new HttpException('El cliente no existe',HttpStatus.NOT_FOUND)
        const result = await this.personaxclienteModel.findOneAndDelete({PersonaAdminOGestor_id: idpersona, PersonaCliente_id: idcliente})
        if(!result) throw new HttpException('Cliente no pudo eliminarse',HttpStatus.NOT_MODIFIED)

        return result

    }

}
