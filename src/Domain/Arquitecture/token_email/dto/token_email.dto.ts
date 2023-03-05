import { IsEmail, IsNotEmpty } from "class-validator";

export class Token_EmailDTO{
    
    @IsNotEmpty({message: "El Token esta vacio"})
    token_email: string;

    @IsNotEmpty({message: "Email vacio"})
    @IsEmail({},{message: "El valor debe ser un Email"})
    email: string
}