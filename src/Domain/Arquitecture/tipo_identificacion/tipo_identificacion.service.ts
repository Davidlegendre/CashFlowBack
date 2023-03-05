import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tipo_Identificacion } from '../../schemas/Tipo-identificacion-model';
import { Model } from 'mongoose';
import { Tipo_Identificacion_Document } from '../../schemas/Tipo-identificacion-model';

@Injectable()
export class TipoIdentificacionService {

    constructor(@InjectModel(Tipo_Identificacion.name)private tipoIdentificacionModel: Model<Tipo_Identificacion_Document>){}

    async ObtenerTodos(): Promise<Tipo_Identificacion[]>
    {
        return await this.tipoIdentificacionModel.find();
    }

    async ObtenerUno(id: string): Promise<Tipo_Identificacion>
    {
        return await this.tipoIdentificacionModel.findById(id)
    }

}
