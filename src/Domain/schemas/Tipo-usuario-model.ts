import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';

export type Tipo_Usuario_Document = HydratedDocument<Tipo_Usuario>;

@Schema({
  timestamps: true
})
export class Tipo_Usuario {
  @Prop({required: true})
  descrip: string;

  @Prop({required: true})
  Code: string
}

export const Tipo_UsuarioSchema = SchemaFactory.createForClass(Tipo_Usuario);