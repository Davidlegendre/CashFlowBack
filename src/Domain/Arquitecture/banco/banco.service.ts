import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banco, Banco_Document } from 'src/Domain/schemas/Banco-mode';

@Injectable({scope: Scope.DEFAULT})
export class BancoService {

    constructor(@InjectModel(Banco.name) private readonly bancomodel: Model<Banco_Document>){}

    async ObtenerTodolosBancos(): Promise<Banco[]>{
        return await this.bancomodel.find();
    }

    async ObtenerUnSoloBanco(_id: string): Promise<Banco>
    {
        return await this.bancomodel.findById(_id);

    }

}
