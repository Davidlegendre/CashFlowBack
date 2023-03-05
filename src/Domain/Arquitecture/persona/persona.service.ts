import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Persona } from '../../schemas/Persona-model';
import { PersonaDocument } from '../../schemas/Persona-model';
import { GeneroService } from '../genero/genero.service';
import { RegistroPersonaDTO } from './dto/registroPersona.dto';
import { TipoIdentificacionService } from '../tipo_identificacion/tipo_identificacion.service';
import { EmpresaService } from '../empresa/empresa.service';

@Injectable()
export class PersonaService {


    constructor(@InjectModel(Persona.name)private personaModel: Model<PersonaDocument>, 
    private generoService: GeneroService,
    private tipoIdentificacionService: TipoIdentificacionService,
    private empresaService: EmpresaService){}

    async ObenerTodo(): Promise<Persona[]>{
        const result = await this.personaModel.find()
        if(result.length == 0) throw new HttpException('No hay personas',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUno(id: string): Promise<Persona>
    {
        const result = await this.personaModel.findById(id)
        if(!result) throw new HttpException('Persona no encontrada',HttpStatus.NOT_FOUND)
        return result
    }

    async CrearPersona(persona: RegistroPersonaDTO): Promise<Persona>
    {
        await this.generoService.ObtenerUnGenero(persona.Genero_id)
        await this.tipoIdentificacionService.ObtenerUno(persona.Tipo_Identificacion_id)
        await this.empresaService.ObtenerUnaEmpresa(persona.Empresa_id)

        const result = await this.personaModel.create(persona)
        if(!result) throw new HttpException('Persona no se ha creado',HttpStatus.NOT_MODIFIED)
        return result
    }

    

}
