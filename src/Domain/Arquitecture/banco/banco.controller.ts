import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Banco } from '../../schemas/Banco-mode';
import { BancoService } from './banco.service';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';

@Controller('banco')
@UseGuards(APIKeyGuard)
export class BancoController {

    constructor(private readonly bancoService: BancoService){}

    @Get('/all')    
    async ObtenerTodos(): Promise<Banco[]>{
        return await this.bancoService.ObtenerTodolosBancos();
    }

    @Get('/one/:id')
    async ObtenerUnoPorID(@Param('id') id: string): Promise<Banco>{
        return await this.bancoService.ObtenerUnSoloBanco(id);
    }
}
