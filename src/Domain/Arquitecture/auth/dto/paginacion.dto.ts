import { IsNumber, IsOptional, Min } from "class-validator";

export default class PaginacionDTO{
    @IsOptional()
    @IsNumber({},{message: "el parametro pagina debe ser un numero"})
    @Min(1)
    pagina?: number;

    @IsOptional()
    @IsNumber({},{message: "el parametro por_pagina debe ser un numero"})
    @Min(10)
    por_pagina?: number;
}