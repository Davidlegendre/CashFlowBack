import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { Banco } from '../../schemas/Banco-mode';
import { BancoService } from './banco.service';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { JWTAuthGuard } from '../../GlobalGuards/JWTAuthGuard.guard';

@UseGuards(APIKeyGuard)
@UseGuards(JWTAuthGuard)
@Controller('banco')
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
