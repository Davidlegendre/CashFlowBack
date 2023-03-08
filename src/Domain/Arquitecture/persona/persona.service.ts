import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Persona } from '../../schemas/Persona-model';
import { PersonaDocument } from '../../schemas/Persona-model';
import { GeneroService } from '../genero/genero.service';
import { RegistroPersonaDTO } from './dto/registroPersona.dto';
import { TipoIdentificacionService } from '../tipo_identificacion/tipo_identificacion.service';
import { EmpresaService } from '../empresa/empresa.service';
import mongoose from 'mongoose';

@Injectable()
export class PersonaService {


    constructor(@InjectModel(Persona.name)private personaModel: Model<PersonaDocument>, 
    private generoService: GeneroService,
    private tipoIdentificacionService: TipoIdentificacionService,
    private empresaService: EmpresaService){}

    ObtenerTodoIncludeenBruto(ids: mongoose.Types.ObjectId[]){
        
        const result = this.personaModel.find({_id: {$in: ids}})
        return result
    }

    async ObenerTodo(): Promise<Persona[]>{
        const result = await this.personaModel.find()
        if(result.length == 0) throw new HttpException('No hay personas',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUno(id: string): Promise<Persona>
    {
        const result = await this.personaModel.findById(id)
        if(!result) throw new HttpException('Persona no encontrada',HttpStatus.NOT_FOUND)
        if(!result.IsActive) throw new HttpException('Persona no Encontrada',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerPorEmail(email: string): Promise<Persona>{
        const result = await this.personaModel.findOne({email: email})
        if(!result) throw new HttpException('Persona no encontrada', HttpStatus.NOT_FOUND)
        return result
    }

    async CrearPersona(persona: RegistroPersonaDTO): Promise<Persona>
    {
        await this.generoService.ObtenerUnGenero(persona.genero_id)
        await this.tipoIdentificacionService.ObtenerUno(persona.tipo_identificacion_id)
        await this.empresaService.ObtenerUnaEmpresa(persona.empresa_id)

        const result = await this.personaModel.create(persona)
        if(!result) throw new HttpException('Persona no se ha creado', HttpStatus.NOT_MODIFIED)
        return result
    }

    async ActualizarPersona(persona: RegistroPersonaDTO, id: string): Promise<Persona>
    {
        await this.ObtenerUno(id);
        await this.generoService.ObtenerUnGenero(persona.genero_id)
        await this.tipoIdentificacionService.ObtenerUno(persona.tipo_identificacion_id)
        await this.empresaService.ObtenerUnaEmpresa(persona.empresa_id)

        const result = await this.personaModel.findByIdAndUpdate(id, persona)
        if(!result) throw new HttpException('Persona no se ha actualizado',HttpStatus.NOT_MODIFIED)
        return await result.save()
    }

    async EliminarPersona(id: string): Promise<Persona>
    {
        await this.ObtenerUno(id);
        const result = await this.personaModel.findByIdAndUpdate(id, { IsActive: false })
        if(!result) throw new HttpException('Persona no eliminada',HttpStatus.NOT_MODIFIED)
        return result;
    }

    async RestaurarPersona(id: string): Promise<Persona>
    {
        const result = await this.personaModel.findByIdAndUpdate(id, {IsActive: true})
        if(!result) throw new HttpException('Persona no restaurada',HttpStatus.NOT_MODIFIED)
        return await result.save()
    }

    

}
