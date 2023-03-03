import { IsNotEmpty,IsEmail } from "class-validator";


export class LoginDTO{
    @IsNotEmpty({message: "Campo Email vacio"})
    @IsEmail({ require_display_name: true}, {message: "Debe ser un Email"})
    email: string;

    @IsNotEmpty({ message: "Campo Password Vacio"})
    password: string;
}
