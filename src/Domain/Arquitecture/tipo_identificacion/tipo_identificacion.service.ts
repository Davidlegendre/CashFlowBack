import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tipo_Identificacion } from '../../schemas/Tipo-identificacion-model';
import { Model } from 'mongoose';
import { Tipo_Identificacion_Document } from '../../schemas/Tipo-identificacion-model';

@Injectable()
export class TipoIdentificacionService {

    constructor(@InjectModel(Tipo_Identificacion.name)private tipoIdentificacionModel: Model<Tipo_Identificacion_Document>){}

    async ObtenerTodos(): Promise<Tipo_Identificacion[]>
    {
        const result = await this.tipoIdentificacionModel.find();
        if(!result) throw new HttpException('Tipos de identificacion no encontrados',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUno(id: string): Promise<Tipo_Identificacion>
    {
        const result = await this.tipoIdentificacionModel.findById(id)
        if(!result) throw new HttpException('Tipo de idenficacion no encontrado',HttpStatus.NOT_FOUND)
        return result
    }

}
