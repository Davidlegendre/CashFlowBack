import { IsNotEmpty, IsUrl } from 'class-validator';
export class EmpresaDTOLogoURL{
    @IsNotEmpty({message: "logo esta Vacio"})
    @IsUrl({protocols: ['https']},{message: "El logo debe ser una URL"})
    logo: string;
}