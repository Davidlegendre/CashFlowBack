import { IsEmail, IsNotEmpty, IsNotIn } from "class-validator";

export class EmailDTO{
    @IsNotEmpty({message: "Email no debe estar vacio"})
    @IsEmail({},{message: "Este campo debe ser un email"})
    @IsNotIn(["cashflowapicenter@gmail.com"], {message: "No puedes agregar ese email"})
    email: string;
}