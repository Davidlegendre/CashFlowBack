import { IsNotEmpty, IsOptional } from "class-validator";

export default class RegirterDTO{
    @IsNotEmpty({message: "necesitas alguna persona"})
    persona_id: string;

    @IsNotEmpty({message: "password no debe estar vacio"})
    password: string;
    
    @IsOptional({message: "tipo usuario es opcional"})
    @IsNotEmpty({message: "tipo usuario no puede estar vacio"})
    tipo_usuario_id: string
}