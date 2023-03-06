import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class RegistroPersonaDTO {
  @IsNotEmpty({ message: 'Nombre no debe estar vacio' })
  nombre: string;

  @IsNotEmpty({message: "Apellido no debe estar vacio"})
  apellido: string;

  @IsNotEmpty({message: "Email no debe estar vacio"})
  @IsEmail({},{message: "el campo debe ser un email"})
  email: string;
  
  @IsNumber({},{message: "telefono debe ser un numero"})
  telefono?: Number;

  @IsNotEmpty({message: "Idenficacion no debe estar vacio"})
  identificacion: string;

  @IsNotEmpty({message: "Genero_id no debe estar vacio"})
  genero_id: string;

  @IsNotEmpty({message: "Tipo_Identificacion_id no debe estar vacio"})
  tipo_identificacion_id: string;

  @IsNotEmpty({message: "Empresa_id no debe estar vacio"})
  empresa_id: string;
}
