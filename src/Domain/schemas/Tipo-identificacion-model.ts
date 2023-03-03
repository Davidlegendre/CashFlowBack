import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Number, Types } from 'mongoose';

export type Tipo_Identificacion_Document = HydratedDocument<Tipo_Identificacion>;

@Schema({
  timestamps: true
})
export class Tipo_Identificacion {
  @Prop({required: true})
  descrip: string;  
}

export const Tipo_IdentificacionSchema = SchemaFactory.createForClass(Tipo_Identificacion);