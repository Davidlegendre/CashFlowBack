import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from 'src/Domain/schemas/Usuario-model';
import { PersonaService } from '../persona/persona.service';
import { TokenEmailService } from '../token_email/token_email.service';
import { hash, compare } from 'bcrypt';
import RegirterDTO from './dto/registre.dto';
import { TipoUsuarioService } from '../tipo_usuario/tipo_usuario.service';
import { Token_EmailDTO } from '../token_email/dto/token_email.dto';
import LoginDTO from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {

    constructor(@InjectModel(Usuario.name)private usuarioModel: Model<UsuarioDocument>,
    private readonly personaService: PersonaService,
    private readonly tokenEmailService: TokenEmailService,
    private readonly tipousuarioService: TipoUsuarioService,
    private readonly jwtService: JwtService){}

    async ObtenerTodos(): Promise<Usuario[]>{
        const result = await this.usuarioModel.find();
        if(result.length == 0) throw new HttpException('No hay Usuarios',HttpStatus.NOT_FOUND)
        return result
    }

    //crear un usuario si la persona esta activa
    //verifica un usuario si la persona esta activa y devuelve token
    //no elimina un usuario porque esta ligado a persona
    //confirma una ves registrado
    async VerificarUsuario(loginDTO: LoginDTO)
    {
        const result: any = await this.personaService.ObtenerPorEmail(loginDTO.email); //si existe
        if(!result.IsActive) throw new HttpException('Usuario esta inactivo',HttpStatus.NOT_FOUND)
        const id = result._id.toString()
        const user = await this.usuarioModel.findOne({Persona_Id: id})
        if(!user) throw new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)
        if(!user.esConfimado) throw new HttpException('Usuario no esta confirmado',HttpStatus.UNAUTHORIZED)
        const verifyPass = await compare(loginDTO.password, user.password)
        if(!verifyPass) throw new HttpException('usuario o password incorrecto', HttpStatus.FORBIDDEN)
    
        const tipousuario = await this.tipousuarioService.ObtenerUno(user.Tipo_Usuario_Id)
        const token =await this.jwtService.signAsync({
            Userid: user.Persona_Id,
            rol: tipousuario.Code,
            name: result.nombre,
            apellido: result.apellido,
            email: result.email
        })

        return {
            token
        }
    }

    async ActivarUsuario(token_emailDTO: Token_EmailDTO)
    {
        const persona: any = await this.personaService.ObtenerPorEmail(token_emailDTO.email)
        if(!persona.IsActive) throw new HttpException('usuario esta inactivo',HttpStatus.NOT_FOUND)
        await this.tokenEmailService.VerificarYUsarTokenEmail(token_emailDTO)
        const id = persona._id.toString()
        const result = await this.usuarioModel.findOneAndUpdate({Persona_Id: id}, {esConfimado: true})
        if(!result) throw new HttpException('Usuario no ha sido modificado',HttpStatus.NOT_MODIFIED)
        return true
    }

    async RegitrarUsuario(usuarioObject: RegirterDTO)
    {
        const persona = await this.personaService.ObtenerUno(usuarioObject.persona_id) //si existe y si esta activo
        const user =await this.usuarioModel.findOne({Persona_Id: usuarioObject.persona_id})
        if(user ) throw new HttpException('una persona ya tiene un usuario',HttpStatus.AMBIGUOUS)

        //si hay un tipo de usuario, lo busca y lo verifica y lo devuelve
        //si no hay un tipo de usuario entonces solo busca el dueño
        const tipousuario: any = usuarioObject.tipo_usuario_id? await this.tipousuarioService.ObtenerUno(usuarioObject.tipo_usuario_id) : await this.tipousuarioService.ObtenerUnoPorCode("D")  

        const passencript = await hash(usuarioObject.password, 10)

        await this.tokenEmailService.CrearTokenEmail(persona.email)

        const result = await this.usuarioModel.create({
            password: passencript,
            Persona_Id: usuarioObject.persona_id,
            Tipo_Usuario_Id: tipousuario._id
        })
        if(!result) throw new HttpException('Usuario no registrado',HttpStatus.NOT_MODIFIED)
        return {
            result: true,
            email: persona.email
        }
        
    }



    //login y register lo hace auth usando a Usuario

}
