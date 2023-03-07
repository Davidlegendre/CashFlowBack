import { IsNotEmpty } from "class-validator";

export default class PersonaXClienteDTO{
    @IsNotEmpty({message: "idpersona no puede estar vacio"})
    idpersona: string;

    @IsNotEmpty({message: "idcliente no puede estar vacio"})
    idcliente: string;
}