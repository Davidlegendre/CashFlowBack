import { IsEmail, IsNotEmpty, IsNotIn, IsNumber, IsOptional } from "class-validator";

export default class RegistroNuevoUsuario{
    @IsNotEmpty({message: "Nombre de Empresa esta Vacio"})   
    nombreempresa: string;

    @IsNotEmpty({message: "Email esta Vacio"})
    @IsEmail({}, {message: "El campo no es un Email"})
    @IsNotIn(["cashflowapicenter@gmail.com"], {message: "No puedes agregar ese email"})
    emailempresa: string;

    @IsNotEmpty({ message: 'Nombre no debe estar vacio' })
    nombrepersona: string;

    @IsNotEmpty({message: "Apellido no debe estar vacio"})
    apellidopersona: string;

    @IsNotEmpty({message: "Email no debe estar vacio"})
    @IsEmail({},{message: "el campo debe ser un email"})
    @IsNotIn(["cashflowapicenter@gmail.com"], {message: "No puedes agregar ese email"})
    emailpersona: string;
    
    @IsNumber({},{message: "telefono debe ser un numero"})
    telefonopersona?: Number;

    @IsNotEmpty({message: "Idenficacion no debe estar vacio"})
    identificacionpersona: string;

    @IsNotEmpty({message: "Genero_id no debe estar vacio"})
    genero_idpersona: string;

    @IsNotEmpty({message: "Tipo_Identificacion_id no debe estar vacio"})
    tipo_identificacion_idpersona: string;

    @IsNotEmpty({message: "password no debe estar vacio"})
    password: string;
}