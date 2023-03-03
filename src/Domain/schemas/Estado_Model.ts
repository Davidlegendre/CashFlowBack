import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Number, Types } from 'mongoose';

export type EstadoDocument = HydratedDocument<Estado>;

@Schema({
  timestamps: true
})
export class Estado {
  @Prop({required: true})
  descrip: string;

  @Prop({required: true})
  Num: Number;  
}

export const EstadoSchema = SchemaFactory.createForClass(Estado);