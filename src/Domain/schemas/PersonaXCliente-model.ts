import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types} from 'mongoose';

export type PersonaXClienteDocument = HydratedDocument<PersonaXCliente>;

@Schema({
  timestamps: true,
})
export class PersonaXCliente {
    @Prop({required: true, type: Types.ObjectId, ref: 'Persona'})
    PersonaAdminOGestor_id: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'Persona'})
    PersonaCliente_id: string;
}

export const PersonaXClienteSchema = SchemaFactory.createForClass(PersonaXCliente);