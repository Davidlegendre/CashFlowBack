import { Injectable, Controller, Inject, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genero, Genero_Document } from 'src/Domain/schemas/Genero-model';

@Injectable({ scope: Scope.DEFAULT})
export class GeneroService {
    constructor(@InjectModel(Genero.name) private generomodel: Model<Genero_Document>){}

    async ObtenerTodosLosGeneros() : Promise<Genero[]>{
        const result = await this.generomodel.find();
        if(!result) throw new HttpException('Generos no encontrados',HttpStatus.NOT_FOUND)
        return result
    }
    async ObtenerUnGenero(_id: string) : Promise<Genero>{
        const result = await this.generomodel.findById({"_id": _id.valueOf()})
        if(!result) throw new HttpException('Genero no encontrado',HttpStatus.NOT_FOUND)
        return result
    }
}
