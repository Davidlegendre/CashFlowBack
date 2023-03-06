import { IsNotEmpty, IsEmail, IsNotIn } from 'class-validator';

export default class EmailPersonaDTO{
    @IsNotEmpty({message: "el email no debe estar vacio"})
    @IsEmail({},{message:"email debe ser un email"})
    @IsNotIn(["cashflowapicenter@gmail.com"], {message: "No puedes agregar ese email"})
    email: string
}