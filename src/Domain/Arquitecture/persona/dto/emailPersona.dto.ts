import { IsNotEmpty, IsEmail } from 'class-validator';

export default class EmailPersonaDTO{
    @IsNotEmpty({message: "el email no debe estar vacio"})
    @IsEmail({},{message:"email debe ser un email"})
    email: string
}