import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';

export type Genero_Document = HydratedDocument<Genero>;

@Schema({
  timestamps: true
})
export class Genero {
  @Prop({required: true})
  descrip: string;
}

export const GeneroSchema = SchemaFactory.createForClass(Genero);