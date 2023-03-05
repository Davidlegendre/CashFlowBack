import { Injectable, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tipo_Ordenes } from '../../schemas/Tipo-ordenes-model';
import { Tipo_Ordenes_Document } from '../../schemas/Tipo-ordenes-model'; 

@Injectable({scope: Scope.DEFAULT})
export class TipoOrdenesService {

    constructor(@InjectModel(Tipo_Ordenes.name) private tipo_ordenes_model: Model<Tipo_Ordenes_Document>) {
        
    }

    async ObtenerTodo(): Promise<Tipo_Ordenes[]>
    {
        const result = await this.tipo_ordenes_model.find();
        if(!result) throw new HttpException('Tipo de Ordenes no encontrados',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUno(id: string): Promise<Tipo_Ordenes>{
        const result = await this.tipo_ordenes_model.findById(id);
        if(!result) throw new HttpException('Tipo de Orden no encontrado',HttpStatus.NOT_FOUND)
        return result
    }
}
