import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export default class CuentaXUsuarioDTO
{
    @IsNotEmpty({message: "el numero de cuenta no debe estar vacio"})
    @IsNumberString({},{message: "numero de cuenta debe ser un numero"})    
    numerocuenta: string;

    @IsNotEmpty({message: "persona no debe estar vacio"})
    persona_id: string;

    @IsNotEmpty({message: "banco no debe estar vacio"})
    banco_id: string;
}