import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Number, Types } from 'mongoose';

export type Tipo_Ordenes_Document = HydratedDocument<Tipo_Ordenes>;

@Schema({
  timestamps: true
})
export class Tipo_Ordenes {
  @Prop({required: true})
  descrip: string;  
}

export const Tipo_OrdenesSchema = SchemaFactory.createForClass(Tipo_Ordenes);