import { IsNotEmpty, IsEmail } from 'class-validator';
export class EmpresaDTO{
    @IsNotEmpty({message: "Nombre de Empresa esta Vacio"})   
    nombreempresa: string;

    @IsNotEmpty({message: "Email esta Vacio"})
    @IsEmail({}, {message: "El campo no es un Email"})
    email: string;
}