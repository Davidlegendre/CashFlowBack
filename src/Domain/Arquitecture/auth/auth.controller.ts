import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import RegirterDTO from './dto/registre.dto';
import { MensajeDTO } from 'src/Domain/DTOGlobal/MensajeModel';
import { AuthService } from './auth.service';
import { EmailDTO } from '../token_email/dto/email.dto';
import { Request } from 'express';
import LoginDTO from './dto/login.dto';
import PasswordUpdateDTO from './dto/passwordupdate.dto';

@UseGuards(APIKeyGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Get('/oiunasoidufhisoaudnfaiosdfoisybdfoasybduy')
    async ObtenerTodo(): Promise<MensajeDTO>{
        return {
            mensaje: "Usuarios",
            Data: await this.authService.ObtenerTodos()
        }
    }

    @Post('/restaurar')
    async RestaurarContrasena(@Body() passwordUpdateDTO: PasswordUpdateDTO): Promise<MensajeDTO>{
        const result = await this.authService.RestaurarPassword(passwordUpdateDTO)
        return {mensaje: "Contraseña restaurada", Data: {result}}
    }

    @Post('/registrar')
    async RegistrarUsuario(@Body() usuarioObject: RegirterDTO): Promise<MensajeDTO>
    {
        const result = await this.authService.RegitrarUsuario(usuarioObject)
        return {mensaje: "Usuario registrado", Data: result}
    }

    @Post('/activar')
    async ActivarUsuario(@Body() emaildto: EmailDTO, @Req() req: Request): Promise<MensajeDTO>
    {
        const { token_email } = req.headers;
        if(!token_email)
        {
            throw new HttpException(
                'Necesitas un token_email',
                HttpStatus.UNAUTHORIZED,
                );
        }
        await this.authService.ActivarUsuario({
            email: emaildto.email,
            token_email: token_email.toString()
        })
        return {mensaje: "Usuario activado", Data: {email: emaildto.email}}
        
    }

    @Post('/login')
    async Login(@Body() loginDTO: LoginDTO): Promise<MensajeDTO>{
        const result = await this.authService.VerificarUsuario(loginDTO)
        return {
            mensaje: "Bienvenido",
            Data: result
        }
    }

}
