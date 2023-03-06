import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types} from 'mongoose';

export type PersonaDocument = HydratedDocument<Persona>;

@Schema({
  timestamps: true,
})
export class Persona {
  @Prop({ required: true })
  nombre: string;
  @Prop({ required: true })
  apellido: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: false, default: null})
  telefono: Number;
  @Prop({ required: true, unique: true})
  identificacion: string;

  @Prop({required: false, default: true})
  IsActive: boolean;

  @Prop({required: true, type: Types.ObjectId, ref: 'Genero'})
  genero_id: string;

  @Prop({required: true, Type: Types.ObjectId, ref: 'Tipo_Identificacion'})
  tipo_identificacion_id: string;

  @Prop({required: true, type: Types.ObjectId, ref: 'Empresa'})
  empresa_id: string;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);
