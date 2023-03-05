import { Injectable, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estado } from 'src/Domain/schemas/Estado_Model'; 
import { EstadoDocument } from 'src/Domain/schemas/Estado_Model';

@Injectable({scope: Scope.DEFAULT})

export class EstadoService {

    constructor(@InjectModel(Estado.name)private estadoModel: Model<EstadoDocument>){}

    async ObtenerTodos(): Promise<Estado[]>
    {
        const result = await this.estadoModel.find();
        if(!result) throw new HttpException('Estados no encontrados',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUnEstado(id: string): Promise<Estado>
    {
        const result = await this.estadoModel.findById(id)
        if(!result) throw new HttpException('Estado no encontrado',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUnEstadoPorNumero(num: number): Promise<Estado>
    {
        const result = await this.estadoModel.findOne({Num: num})
        if(!result) throw new HttpException('Estado no encontrado',HttpStatus.NOT_FOUND)
        return result
    }

}
