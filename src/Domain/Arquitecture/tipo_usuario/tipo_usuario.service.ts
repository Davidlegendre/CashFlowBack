import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tipo_Usuario, Tipo_Usuario_Document } from '../../schemas/Tipo-usuario-model';

@Injectable()
export class TipoUsuarioService {

    constructor(@InjectModel(Tipo_Usuario.name)private tipo_usuarioModel: Model<Tipo_Usuario_Document>){}

    async ObtenerTodos(): Promise<Tipo_Usuario[]>
    {
        return await this.tipo_usuarioModel.find();
    }

    async ObtenerUno(id: string): Promise<Tipo_Usuario>
    {
        return await this.tipo_usuarioModel.findById(id)
    }

    async ObtenerUnoPorCode(code: string): Promise<Tipo_Usuario>
    {
        return await this.tipo_usuarioModel.findOne({Code: code})
    }
}
