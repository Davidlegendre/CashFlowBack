import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token_Email } from '../../schemas/Tokens-emails';
import { Token_Email_Document } from '../../schemas/Tokens-emails';
import { Token_EmailDTO } from './dto/token_email.dto';
import { getDateNow } from '../../Helpers/Time.helper';
import { EmailFactoryService } from '../email-factory/email-factory.service';

@Injectable()
export class TokenEmailService {

    constructor(@InjectModel(Token_Email.name) private token_emailModel: Model<Token_Email_Document>, private readonly emailFactoryService: EmailFactoryService){}

    async obtenerTodo(): Promise<Token_Email[]>
    {
        return await this.token_emailModel.find()
    }

    async VerificarYUsarTokenEmail(toke_emailDTO: Token_EmailDTO): Promise<boolean>
    {
       const token_email = await this.token_emailModel.findOne({email: toke_emailDTO.email})
        if(token_email && token_email._id.toString() === toke_emailDTO.token_email && getDateNow() <= token_email.FechaExpiracion)
        {              
            await this.token_emailModel.findByIdAndDelete(token_email._id)  
            this.EliminarVencidos();                    
            return true;
        }        
        throw new HttpException('Token no encontrado o expirado',HttpStatus.NOT_FOUND)
    }

    async CrearTokenEmail(email: string):Promise<boolean>
    {
        await this.token_emailModel.findOneAndDelete({email})
        const result = await this.token_emailModel.create({email})
        await this.emailFactoryService.SendEmail("Este es tu token: " + result._id, email)
        return true;  
    }

    async EliminarVencidos(){
        const result = await this.token_emailModel.find({FechaExpiracion: {$lte: getDateNow()}})
        if(result)  await this.token_emailModel.deleteMany({FechaExpiracion: {$lte: getDateNow()} })             
    }
}
