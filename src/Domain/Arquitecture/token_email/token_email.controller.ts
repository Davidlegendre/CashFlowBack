import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { TokenEmailService } from './token_email.service';
import { MensajeDTO } from 'src/Domain/DTOGlobal/MensajeModel';
import { Token_EmailDTO } from './dto/token_email.dto';
import { EmailDTO } from './dto/email.dto';

@Controller('token-email')
@UseGuards(APIKeyGuard)
export class TokenEmailController {

    constructor(private readonly token_emailService: TokenEmailService){}

    /*@Get('/all')
    async obtenerTodo(){
        return await this.token_emailService.obtenerTodo()
    }*/

    @Post('/create')
    async CrearTokenEmail(@Body() email: EmailDTO): Promise<MensajeDTO>
    {
        const result = await this.token_emailService.CrearTokenEmail(email.email)
        await this.token_emailService.EliminarVencidos()
        return { mensaje: "Token Email", Data: {result} }
    }

    /*@Post('/verificarusar')
    async VerificarYUsarToken(@Body() tokenEmailDTO: Token_EmailDTO): Promise<MensajeDTO>
    {
        const result = await this.token_emailService.VerificarYUsarTokenEmail(tokenEmailDTO)
        await this.token_emailService.EliminarVencidos()
        return {mensaje: result == false?"El token ya expiró o no existe": "Verificado", Data: {result}}
    }*/
}
