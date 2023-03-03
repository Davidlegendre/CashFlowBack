import { Controller, UseGuards } from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';

@Controller('empresa')
@UseGuards(APIKeyGuard)
export class EmpresaController {}
