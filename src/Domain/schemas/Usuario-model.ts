import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types} from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({
  timestamps: true,
})
export class Usuario {
    @Prop({required: false, default: false})
    esConfimado: boolean;

    @Prop({required: true})
    password: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Persona'})
    Persona_Id: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Tipo_Usuario' })
    Tipo_Usuario_Id: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);