import { IsNotEmpty, IsEmail } from 'class-validator';
export class EmpresaDTO{
    @IsNotEmpty({message: "Nombre de Empresa esta Vacio"})    
    nombreEmpresa: string;

    @IsNotEmpty({message: "Email esta Vacio"})
    @IsEmail({require_display_name: true}, {message: "El campo no es un Email"})
    email: string;
}