import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import RegirterDTO from './dto/registre.dto';
import { MensajeDTO } from '../../DTOGlobal/MensajeModel';
import { AuthService } from './auth.service';
import { EmailDTO } from '../token_email/dto/email.dto';
import { Request } from 'express';
import LoginDTO from './dto/login.dto';
import PasswordUpdateDTO from './dto/passwordupdate.dto';
import PaginacionDTO from './dto/paginacion.dto';
import { JWTAuthGuard } from '../../GlobalGuards/JWTAuthGuard.guard';
import RegistroNuevoUsuario from './dto/registronuevo.dto';

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
        const result = await this.authService.RegitrarUsuarioPersonaExistente(usuarioObject)
        return {mensaje: "Usuario registrado, verifique email", Data: result}
    }

    @Post('/registrar/nuevo')
    async RegistrarNuevoUsuario(@Body() usuarioNuevoDTo: RegistroNuevoUsuario): Promise<MensajeDTO>
    {
        const result = await this.authService.RegistrarNuevoUsuario(usuarioNuevoDTo)
        return {mensaje: "Usuario registrado, verifique email", Data: result}
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

    @UseGuards(JWTAuthGuard)
    @Post('/misclientes')
    async ObtenerPersonassegun(@Body() paginacion: PaginacionDTO, @Req() req: Request):Promise<MensajeDTO>
    {
        const {Userid}: any = req.user
        const result = await this.authService.ObtenerTodasLasPersonasSegun(Userid, paginacion)
        return {mensaje: "Personas en tu cuenta", Data: result}
    }

    @UseGuards(JWTAuthGuard)
    @Post('/me')
    async Me(@Req() req: Request): Promise<MensajeDTO>
    {
        const {person}: any = req.user
        const result = await this.authService.Me(person)
        return {mensaje: "Este eres tu", Data: result}
    }

    /*@UseGuards(JWTAuthGuard)
    @Get('/all')
    async ObtenerTodo(): Promise<MensajeDTO>
    {
        const result = await this.personaService.ObenerTodo()
        return {mensaje: "Personas", Data: result};
    } */

}
