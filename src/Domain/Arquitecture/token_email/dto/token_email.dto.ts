import { IsEmail, IsNotEmpty, IsNotIn } from "class-validator";

export class Token_EmailDTO{
    
    @IsNotEmpty({message: "El Token esta vacio"})
    token_email: string;

    @IsNotEmpty({message: "Email vacio"})
    @IsEmail({},{message: "El valor debe ser un Email"})
    @IsNotIn(["cashflowapicenter@gmail.com"], {message: "No puedes agregar ese email"})
    email: string
}