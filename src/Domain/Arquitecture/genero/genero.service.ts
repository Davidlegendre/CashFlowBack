import { Injectable, Controller, Inject, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genero, Genero_Document } from 'src/Domain/schemas/Genero-model';

@Injectable({ scope: Scope.DEFAULT})
export class GeneroService {
    constructor(@InjectModel(Genero.name) private generomodel: Model<Genero_Document>){}

    async ObtenerTodosLosGeneros() : Promise<Genero[]>{
        return await this.generomodel.find();
    }
    async ObtenerUnGenero(_id: string) : Promise<Genero>{
        return await this.generomodel.findById({"_id": _id.valueOf()})
    }
}
