import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estado } from 'src/Domain/schemas/Estado_Model'; 
import { EstadoDocument } from 'src/Domain/schemas/Estado_Model';

@Injectable({scope: Scope.DEFAULT})

export class EstadoService {

    constructor(@InjectModel(Estado.name)private estadoModel: Model<EstadoDocument>){}

    async ObtenerTodos(): Promise<Estado[]>
    {
        return await this.estadoModel.find();
    }

    async ObtenerUnEstado(id: string): Promise<Estado>
    {
        return await this.estadoModel.findById(id)
    }

    async ObtenerUnEstadoPorNumero(num: number): Promise<Estado>
    {
        return await this.estadoModel.findOne({Num: num})
    }

}
