import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tipo_Usuario, Tipo_Usuario_Document } from '../../schemas/Tipo-usuario-model';

@Injectable()
export class TipoUsuarioService {

    constructor(@InjectModel(Tipo_Usuario.name)private tipo_usuarioModel: Model<Tipo_Usuario_Document>){}

    async ObtenerTodos(): Promise<Tipo_Usuario[]>
    {
        const result = await this.tipo_usuarioModel.find();
        if(!result) throw new HttpException('Tipo de usuarios no encontrados',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUno(id: string): Promise<Tipo_Usuario>
    {
        const result = await this.tipo_usuarioModel.findById(id)
        if(!result) throw new HttpException('Tipo de usuario no encontrado',HttpStatus.NOT_FOUND)
        return result
    }

    async ObtenerUnoPorCode(code: string): Promise<Tipo_Usuario>
    {
        const result = await this.tipo_usuarioModel.findOne({Code: code})
        if(!result) throw new HttpException('Tipo de usuario no encontrado',HttpStatus.NOT_FOUND)
        return result
    }
}
