import { Model } from "mongoose";
import { TipoUsuarioService } from "../Arquitecture/tipo_usuario/tipo_usuario.service";
import { PersonaDocument } from "../schemas/Persona-model";
import { UsuarioDocument } from "../schemas/Usuario-model";
import mongoose from 'mongoose';
import { rol } from '../Arquitecture/tipo_usuario/enums/tipousuario.enum';

export async function ObtenerDatosDelDueño(tipousuarioService: TipoUsuarioService, usuarioModel: Model<UsuarioDocument>, personaModel: Model<PersonaDocument>, empresa_id: string){
    //admin o gestor => idempresa   
    //averiguo el rol de dueño
    const tipoUsuarioDueño = await tipousuarioService.ObtenerUnoPorCode(rol.Dueño)
    //obtengo todos los usuarios que sean dueños
    const user  = await usuarioModel.find({Tipo_Usuario_Id: tipoUsuarioDueño})
    //mapeo solo los ids de las personas tipos dueños
    const ids = user.map(e => new mongoose.Types.ObjectId(e.Persona_Id))
    //busco a la persona que este entre los dueños y que a su vez sea de la empresa
    const persona = await personaModel.findOne({_id: {$in: ids}, empresa_id: empresa_id})
    return persona
}