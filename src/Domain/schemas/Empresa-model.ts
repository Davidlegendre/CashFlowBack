import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';

export type Empresa_Document = HydratedDocument<Empresa>;

@Schema({
  timestamps: true
})
export class Empresa {
  @Prop({required: true, unique: true})
  nombreempresa: string;
  
  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: false, default: ""})
  logo: string;

  @Prop({required: true, default: true})
  IsActive: boolean;
}

export const EmpresaSchema = SchemaFactory.createForClass(Empresa);