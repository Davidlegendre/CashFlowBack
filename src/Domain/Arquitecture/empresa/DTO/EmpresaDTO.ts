import { IsNotEmpty, IsEmail, IsNotIn, IsLowercase } from 'class-validator';
export class EmpresaDTO{
    @IsNotEmpty({message: "Nombre de Empresa esta Vacio"})   
    nombreempresa: string;

    @IsNotEmpty({message: "Email esta Vacio"})
    @IsEmail({}, {message: "El campo no es un Email"})
    @IsNotIn(["cashflowapicenter@gmail.com"], {message: "No puedes agregar ese email"})
    @IsLowercase({message: "email debe ser todo en minusculas"})
    email: string;
}