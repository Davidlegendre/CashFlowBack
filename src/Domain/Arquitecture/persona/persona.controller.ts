import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { RegistroPersonaDTO } from './dto/registroPersona.dto';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { TokenEmailService } from '../token_email/token_email.service';
import EmailPersonaDTO from './dto/emailPersona.dto';
import { JWTAuthGuard } from '../../../Domain/GlobalGuards/JWTAuthGuard.guard';

@UseGuards(APIKeyGuard)
@Controller('persona')
export class PersonaController {

    constructor(private readonly personaService: PersonaService, private readonly token_emailService: TokenEmailService){}

    

    @UseGuards(JWTAuthGuard)
    @Get('/one/:id')
    async ObtenerUno(@Param('id') id: string): Promise<MensajeDTO>
    {
        const result = await this.personaService.ObtenerUno(id)
        return {mensaje: "Persona", Data: result}
    }

    @Post('/create')
    async CrearUnaPersona(@Body() personaDTO: RegistroPersonaDTO): Promise<MensajeDTO>
    {
        const result = await this.personaService.CrearPersona(personaDTO)
        return {mensaje: "Persona Creada", Data: result}
    }

    @UseGuards(JWTAuthGuard)
    @Put('/update/:id')
    async ActualizarPersona(@Body() personaDTO: RegistroPersonaDTO, @Param('id') id: string): Promise<MensajeDTO>
    {
        const result = await this.personaService.ActualizarPersona(personaDTO, id)
        return {mensaje: "Persona Actualizada", Data: result}
    }

    @UseGuards(JWTAuthGuard)
    @Post('/eliminar/:id')
    async EliminarPersona(@Param('id') id: string, @Req() req: Request): Promise<MensajeDTO>
    {
        const { token_email } = req.headers;
        const Per = await this.personaService.ObtenerUno(id);
        if (!token_email) {
            throw new HttpException(
                'Necesitas un token_email',
                HttpStatus.UNAUTHORIZED,
                );        
        }
        await this.token_emailService.VerificarYUsarTokenEmail({
            email: Per.email,
            token_email: token_email.toString(),
        });
        const result = await this.personaService.EliminarPersona(id)
        return {mensaje: "Persona Eliminada", Data: result}
       
    }

    @Post('/restaurar')
    async RestaurarPersona(@Body() emailPersonaDTO: EmailPersonaDTO, @Req() req: Request): Promise<MensajeDTO>
    {
        const { token_email } = req.headers;
        const Per: any = await this.personaService.ObtenerPorEmail(emailPersonaDTO.email);
        if(!token_email)
        {
            throw new HttpException(
                'Necesitas un token_email',
                HttpStatus.UNAUTHORIZED,
                );
        }
        await this.token_emailService.VerificarYUsarTokenEmail({
            email: Per.email,
            token_email: token_email.toString()
        })
        const result = await this.personaService.RestaurarPersona(Per._id)
        return {mensaje: "Persona restaurada", Data: result}
       
    }

}
