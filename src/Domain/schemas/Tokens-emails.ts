import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';
import { addMilisecondsToDate } from '../Helpers/Time.helper';

export type Token_Email_Document = HydratedDocument<Token_Email>;

@Schema({
    timestamps: true
})
export class Token_Email {
  @Prop({required: true, default: addMilisecondsToDate(2 * 180000)})
  FechaExpiracion: Date;

  @Prop({required: true})
  email: string;
}

export const Token_EmailSchema = SchemaFactory.createForClass(Token_Email);