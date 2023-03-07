import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types} from 'mongoose';

export type CuentasBancoXUsuarioDocument = HydratedDocument<CuentasBancoXUsuario>;

@Schema({
  timestamps: true,
})
export class CuentasBancoXUsuario {
    @Prop({required: true})
    numerocuenta: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Persona'})
    Persona_id: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Banco'})
    Banco_Id: string;
}

export const CuentasBancoXUsuarioSchema = SchemaFactory.createForClass(CuentasBancoXUsuario);