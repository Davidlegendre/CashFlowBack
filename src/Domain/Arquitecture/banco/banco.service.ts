import { Injectable, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banco, Banco_Document } from '../../../Domain/schemas/Banco-mode';

@Injectable({scope: Scope.DEFAULT})
export class BancoService {

    constructor(@InjectModel(Banco.name) private readonly bancomodel: Model<Banco_Document>){}

    async ObtenerTodolosBancos(): Promise<Banco[]>{
        const result = await this.bancomodel.find();
        if(result.length == 0) throw new HttpException('No hay Bancos',HttpStatus.NOT_FOUND)
        return result;
    }

    async ObtenerUnSoloBanco(_id: string): Promise<Banco>
    {
        const result = await this.bancomodel.findById(_id);
        if(!result) throw new HttpException('Banco no Encontrado',HttpStatus.NOT_FOUND)
        return result

    }

}
