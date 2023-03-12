import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from '../../../Domain/schemas/Usuario-model';
import { PersonaService } from '../persona/persona.service';
import { TokenEmailService } from '../token_email/token_email.service';
import { hash, compare } from 'bcrypt';
import RegirterDTO from './dto/registre.dto';
import { TipoUsuarioService } from '../tipo_usuario/tipo_usuario.service';
import { Token_EmailDTO } from '../token_email/dto/token_email.dto';
import { JwtService } from '@nestjs/jwt/dist';
import PasswordUpdateDTO from './dto/passwordupdate.dto';
import { Persona } from '../../../Domain/schemas/Persona-model';
import { rol } from '../tipo_usuario/enums/tipousuario.enum';
import PaginacionDTO from './dto/paginacion.dto';
import { EmpresaService } from '../empresa/empresa.service';
import { PersonaSegunIDUsuarioType } from './types/personassegunidusuario.type';
import { Paginar } from '../../../Domain/Helpers/paginacion.helper';
import { PersonaDocument } from '../../schemas/Persona-model';
import { PersonaxclienteService } from '../personaxcliente/personaxcliente.service';
import { ObtenerDatosDelDueño } from '../../../Domain/Helpers/obtenerdueno.helper';
import LoginDTO from './dto/login.dto'; 
import GenerarImgPerfil from '../../../Domain/Helpers/imggenerate.helper';
import RegistroNuevoUsuario from './dto/registronuevo.dto';
import { GeneroService } from '../genero/genero.service';
import { TipoIdentificacionService } from '../tipo_identificacion/tipo_identificacion.service';
import { Empresa } from '../../schemas/Empresa-model';

@Injectable()
export class AuthService {

    constructor(@InjectModel(Usuario.name)private usuarioModel: Model<UsuarioDocument>,
    @InjectModel(Persona.name)private personaModel: Model<PersonaDocument>,
    private readonly personaService: PersonaService,
    private readonly tokenEmailService: TokenEmailService,
    private readonly tipousuarioService: TipoUsuarioService,
    private readonly empresaService: EmpresaService,
    private readonly jwtService: JwtService,
    private readonly personaxclienteService: PersonaxclienteService,
    private readonly generoService: GeneroService,
    private readonly tipoIdentificacionService: TipoIdentificacionService){}

    async ObtenerTodos(): Promise<Usuario[]>{
        const result = await this.usuarioModel.find();
        if(result.length == 0) throw new HttpException('No hay Usuarios',HttpStatus.NOT_FOUND)
        return result
    }

    /*
    "persona => obtener: Dueño => todas las personas que estan con su correo mas el (hacer paginacion)", 
        "Administrador => todas las personas que fueron agregadas por el y su dueño (hacer paginacion)", 
        "Gestor => todas las personas tipo cliente que agrego, mas su dueño (hacer paginacion)",
        "Cliente => se vera el, su gestor"
    */

        //ingresa su idUsuario para saber su tipo de usuario
        //sacar su idpersona
        //obtiene desde personas todas las que tengan su idpersona
        //incluido su dueño (idempresa)
    async ObtenerTodasLasPersonasSegun(idUsuario: string, paginacionDTO:PaginacionDTO):Promise<PersonaSegunIDUsuarioType>{
        const usuario = await this.usuarioModel.findById(idUsuario)   
        if(!usuario) throw new HttpException('Usuario no existe',HttpStatus.NOT_FOUND)
        const persona:any = await this.personaService.ObtenerUno(usuario.Persona_Id)          
        const tipousuario = await this.tipousuarioService.ObtenerUno(usuario.Tipo_Usuario_Id)

        let respuesta: { paginas: number, count: number, results, dueño: Persona };
        const dueño: Persona = tipousuario.Code !== rol.Dueño? await ObtenerDatosDelDueño(this.tipousuarioService,this.usuarioModel,this.personaModel,persona.empresa_id) : null
        
        switch (tipousuario.Code) {
            case rol.Dueño:
                const query = await this.personaModel.find({empresa_id: persona.empresa_id})
                const querybruto = this.personaModel.find({empresa_id: persona.empresa_id})
                const personasDueño = await Paginar(querybruto,query.length, paginacionDTO)
                respuesta = {paginas: personasDueño.paginas, count: personasDueño.count, results: personasDueño.results, dueño: persona}
                break;
            case rol.Administrador || rol.Gestor:
                //buscar al dueño           
                const query2 = await this.personaxclienteService.ObtenerTodosenBruto(persona._id) 
                const query2bruto =this.personaxclienteService.ObtenerTodosenBruto(persona._id)   
                const adminOGestorPersonas = await Paginar(query2bruto,query2.length, paginacionDTO)
                respuesta = {paginas: adminOGestorPersonas.paginas, count: adminOGestorPersonas.count, results: adminOGestorPersonas.results, dueño: dueño}
                break;
            default:
                //buscar al dueño
                respuesta = {paginas: 0, count: 0, results: [{
                    persona
                }], dueño: dueño}
                break;
        }
        return {            
            paginacion: {
                Total_pagina: isNaN(respuesta.paginas)?1:respuesta.paginas,
                pagina_actual: paginacionDTO.pagina??1,
                Total_registros: respuesta.count,
                numero_por_pagina: paginacionDTO.por_pagina??respuesta.count
            },
            data:{
                dueño: {
                    nombre: respuesta.dueño.nombre + " " + respuesta.dueño.apellido,
                    email: respuesta.dueño.email,
                    telefono: respuesta.dueño.telefono
                },
                Personas: respuesta.results
            }
        }
    }
    //crear un usuario si la persona esta activa
    //verifica un usuario si la persona esta activa y devuelve token
    //no elimina un usuario porque esta ligado a persona
    //confirma una ves registrado
    async VerificarUsuario(loginDTO: LoginDTO)
    {
        const result: any = await this.personaService.ObtenerPorEmail(loginDTO.email);
        if(!result.IsActive) throw new HttpException('Usuario esta inactivo',HttpStatus.NOT_FOUND)
        const id = result._id.toString()
        const user = await this.usuarioModel.findOne({Persona_Id: id})
        if(!user) throw new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)
        if(!user.esConfimado) throw new HttpException('Usuario no esta confirmado',HttpStatus.UNAUTHORIZED)
        const empresa: any = await this.empresaService.ObtenerUnaEmpresa(result.empresa_id)
        const verifyPass = await compare(loginDTO.password, user.password)
        if(!verifyPass) throw new HttpException('usuario o password incorrecto', HttpStatus.FORBIDDEN)
    
        const tipousuario = await this.tipousuarioService.ObtenerUno(user.Tipo_Usuario_Id)
        const token = await this.jwtService.signAsync({
            Userid: user._id,
            person: user.Persona_Id,
            rol: tipousuario.Code,
            name: result.nombre,
            apellido: result.apellido
        })

        const logo = empresa.logo === "" ? GenerarImgPerfil(empresa.email) : empresa.logo
        const img = GenerarImgPerfil(result.email)
        return {
            token,
            persona:
            {
                Userid: user._id,
                rol: tipousuario.Code,
                name: result.nombre,
                apellido: result.apellido,
                email: result.email,
                img: img,
                empresa: {
                    id: empresa._id,
                    nombre: empresa.nombreempresa,
                    logo: logo
                }
            }
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

    async RegistrarNuevoUsuario(registroNuevo: RegistroNuevoUsuario){
        await this.generoService.ObtenerUnGenero(registroNuevo.genero_idpersona)
        await this.tipoIdentificacionService.ObtenerUno(registroNuevo.tipo_identificacion_idpersona)
        //registrar empresa
        try {
            const re = await this.empresaService.ObtenerEmpresaPorEmail(registroNuevo.emailempresa.toLowerCase())
            if(re)
                throw new HttpException('Empresa ya existe',HttpStatus.AMBIGUOUS)
        } catch (error) {
            
        }

        try {
            const per = await this.personaService.ObtenerPorEmail(registroNuevo.emailpersona.toLowerCase())
            if(per)
                throw new HttpException('Persona ya existe',HttpStatus.AMBIGUOUS)
        } catch (error) {
            
        }

        const newempresa = new Empresa()
        newempresa.email = registroNuevo.emailempresa.toLowerCase();
        newempresa.nombreempresa = registroNuevo.nombreempresa

        const empresa: any = await this.empresaService.CrearEmpresa(newempresa)        
        //registrar persona

        const persona: any = await this.personaService.CrearPersona({
            nombre: registroNuevo.nombrepersona,
            apellido: registroNuevo.apellidopersona,
            email: registroNuevo.emailpersona,
            empresa_id: empresa._id.toString(),
            genero_id: registroNuevo.genero_idpersona,
            identificacion: registroNuevo.identificacionpersona,
            tipo_identificacion_id: registroNuevo.tipo_identificacion_idpersona,
            telefono: registroNuevo.telefonopersona
        })

        //registrar usuario
        const usuario = await this.RegitrarUsuarioPersonaExistente({
            password: registroNuevo.password,
            persona_id: persona._id.toString(),
            tipo_usuario_id: null
        })

        return usuario
    }

    async RegitrarUsuarioPersonaExistente(usuarioObject: RegirterDTO)
    {
        const persona = await this.personaService.ObtenerUno(usuarioObject.persona_id) //si existe y si esta activo                
        const user =await this.usuarioModel.findOne({Persona_Id: usuarioObject.persona_id})
        if(user) throw new HttpException('una persona ya tiene un usuario',HttpStatus.AMBIGUOUS)

         //si hay un tipo de usuario, lo busca y lo verifica y lo devuelve
        //si no hay un tipo de usuario entonces solo busca el dueño
        const tipousuario: any = usuarioObject.tipo_usuario_id? await this.tipousuarioService.ObtenerUno(usuarioObject.tipo_usuario_id) : await this.tipousuarioService.ObtenerUnoPorCode("D") 

        const passencript = await hash(usuarioObject.password, 10)
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
    //para restaurar password si se olvido => enviar token del correo, nueva contraseña, el token del email y el email, luego usa el token con el email luego si todo va bien, actualiza el password

    async RestaurarPassword(passwordupdateDto: PasswordUpdateDTO)
    {
        const persona: any = await this.personaService.ObtenerPorEmail(passwordupdateDto.email); //si existe
        if(!persona.IsActive) throw new HttpException('Usuario esta inactivo',HttpStatus.NOT_FOUND)
        const idpersona = persona._id.toString()
        const usuario = await this.usuarioModel.findOne({Persona_Id: idpersona})
        if(!usuario) throw new HttpException('La persona no tiene un usuario',HttpStatus.NOT_FOUND)

        await this.tokenEmailService.VerificarYUsarTokenEmail({
            email: passwordupdateDto.email,
            token_email: passwordupdateDto.token_email
        })
        const passencript = await hash(passwordupdateDto.newpassword, 10)
        const result = await this.usuarioModel.findByIdAndUpdate(usuario._id, {password: passencript})
        if(!result) throw new HttpException('Usuario no actualizado',HttpStatus.NOT_MODIFIED)
        return true
       
    }

    async Me(idpersona: string)
    {
        const persona: any = await this.personaService.ObtenerUno(idpersona)
        const img = GenerarImgPerfil(persona.email)
        return {
            id: persona._id,
            nombre: persona.nombre,
            apellido: persona.apellido,
            email: persona.email,
            telefono: persona.telefono,
            identificacion: persona.identificacion,
            generoid: persona.genero_id,
            tipo_identificacion_id: persona.tipo_identificacion_id,
            empresaid: persona.empresa_id,
            img: img
        }
    }


    //login y register lo hace auth usando a Usuario

}
