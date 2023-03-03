import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types} from 'mongoose';

export type OrdenesDocument = HydratedDocument<Ordenes>;

@Schema({
  timestamps: true,
})
export class Ordenes {
    @Prop({required: true})
    monto: number;

    @Prop({required: false, default: ""})
    img: string;

    @Prop({required: true, default: 10})
    tasa: number;

    @Prop({required: true})
    monto_Total: number;

    @Prop({required: true, default: Date.now()})
    FechaSolicitud: Date

    @Prop({required: true, type: Types.ObjectId, ref: 'Persona'})
    PersonaCliente_Id: string;

    @Prop({required: false, type: Types.ObjectId, ref: 'Persona', default: null})
    PersonaAdministrador_Id: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Persona'})
    PersonaGestor_Id: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Tipo_Ordenes'})
    Tipo_Ordenes_Id: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Estado'})
    Estado_Id: string;

}

export const OrdenesSchema = SchemaFactory.createForClass(Ordenes);