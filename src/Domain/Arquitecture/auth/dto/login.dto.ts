import { IsEmail, IsNotEmpty } from "class-validator";

export default class LoginDTO{
    @IsNotEmpty({message: "email no puede estar vacio"})
    @IsEmail({},{message: "email debe ser un email valido"})
    email: string;

    @IsNotEmpty({message: "password no debe estar vacio"})
    password: string;
}