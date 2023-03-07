import { IsEmail, IsNotEmpty, IsNotIn } from "class-validator";

export default class PasswordUpdateDTO
{    
    @IsNotEmpty({message: "newpassword no debe estar vacio"})
    newpassword: string;

    @IsNotEmpty({message: "El Token esta vacio"})
    token_email: string;

    @IsNotEmpty({message: "Email vacio"})
    @IsEmail({},{message: "El valor debe ser un Email"})
    @IsNotIn(["cashflowapicenter@gmail.com"], {message: "No puedes agregar ese email"})
    email: string
    
}