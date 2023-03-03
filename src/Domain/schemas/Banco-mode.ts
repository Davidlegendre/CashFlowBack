import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';

export type Banco_Document = HydratedDocument<Banco>;

@Schema({
    timestamps: true
})
export class Banco {
  @Prop({required: true})
  bancodescrip: string;
  @Prop({required: false})
  logo: string;
  @Prop({required: true})
  URL: string;
}

export const BancoSchema = SchemaFactory.createForClass(Banco);