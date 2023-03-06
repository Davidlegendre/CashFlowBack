import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import RegirterDTO from './dto/registre.dto';
import { MensajeDTO } from 'src/Domain/DTOGlobal/MensajeModel';
import { AuthService } from './auth.service';
import { EmailDTO } from '../token_email/dto/email.dto';
import { Request } from 'express';
import LoginDTO from './dto/login.dto';
import { JWTAuthGuard } from '../../GlobalGuards/JWTAuthGuard.guard';

@Controller('auth')
@UseGuards(APIKeyGuard)
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Get('/s3MzP4oe27+aM+7pKJ681IilooKmX1zQny6TKnO4wEzz6kFc2blAb3E3LOkNBV3y')
    async ObtenerTodo(): Promise<MensajeDTO>{
        return {
            mensaje: "Usuarios",
            Data: await this.authService.ObtenerTodos()
        }
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
