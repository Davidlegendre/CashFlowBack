import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailDTO{
    @IsNotEmpty({message: "Email no debe estar vacio"})
    @IsEmail({},{message: "Este campo debe ser un email"})
    email: string;
}