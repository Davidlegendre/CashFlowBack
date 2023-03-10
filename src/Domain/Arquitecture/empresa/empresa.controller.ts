import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { APIKeyGuard } from '../../GlobalGuards/Guard.global';
import { EmpresaService } from './empresa.service';
import { EmpresaDTO } from './DTO/EmpresaDTO';
import { MensajeDTO } from '../../../Domain/DTOGlobal/MensajeModel';
import { Empresa } from '../../../Domain/schemas/Empresa-model';
import { EmpresaDTOLogoURL } from './DTO/EmpresaLogoDTO.URL';
import { TokenEmailService } from '../token_email/token_email.service';
import { Request } from 'express';
import { EmailDTO } from '../token_email/dto/email.dto';
import { JWTAuthGuard } from '../../../Domain/GlobalGuards/JWTAuthGuard.guard';
import { RolesGuard } from '../../GlobalGuards/Role.guard';
import { Roles } from '../../GlobalGuards/role.decorator';
import { rol } from '../tipo_usuario/enums/tipousuario.enum';


@UseGuards(APIKeyGuard)
@Controller('empresa')
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly token_emailService: TokenEmailService,
  ) {}


  @Get('/all')
  async ObtenerTodas(): Promise<MensajeDTO> {
    const result = await this.empresaService.ObtenerTodasLasEmpresas();
    return { mensaje: 'Lista de Empresas', Data: result };
  }

  @Get('/one/:id')
  async ObtenerUnaEmpresa(@Param('id') id: string): Promise<MensajeDTO> {
    const emp = await this.empresaService.ObtenerUnaEmpresa(id);
    return { mensaje: 'Empresa', Data: emp };
  }

  @Post('/create')
  async CrearUnaEmpresa(@Body() empresaDTo: EmpresaDTO): Promise<MensajeDTO> {
    const empresa = new Empresa();
    empresa.email = empresaDTo.email;
    empresa.nombreempresa = empresaDTo.nombreempresa;
    const result = await this.empresaService.CrearEmpresa(empresa);
    return { mensaje: 'Empresa Creada Correctamente', Data: result };
  }

  @Roles(rol.Dueño)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Put('/update/:id')
  async ActualizarEmpresa(
    @Body() empresadto: EmpresaDTO,
    @Param('id') id: string,
  ): Promise<MensajeDTO> {
    const emp = await this.empresaService.ObtenerUnaEmpresa(id);
    const result = await this.empresaService.ActualizarEmpresa(id, {
      logo: emp.logo,
      IsActive: emp.IsActive,
      nombreempresa: empresadto.nombreempresa,
      email: empresadto.email,
    });
    return { mensaje: 'Empresa Actualizada', Data: result };
  }

  @Roles(rol.Dueño)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Post('/logo/updatePorURL/:id')
  async ActualizarLogoPorURL(
    @Body() logoDTO: EmpresaDTOLogoURL,
    @Param('id') id: string,
  ): Promise<MensajeDTO> {
    await this.empresaService.ObtenerUnaEmpresa(id);
    const result = await this.empresaService.ActualizarLogo(logoDTO.logo, id);
    return { mensaje: 'Logo Actualizada', Data: result };
  }

  @Roles(rol.Dueño)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Post('/eliminar/:id')
  async EliminarEmpresa(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<MensajeDTO> {
    const { token_email } = req.headers;
    const emp = await this.empresaService.ObtenerUnaEmpresa(id);
    if (!token_email) {
      throw new HttpException(
        'Necesitas un token_email o la empresa no existe',
        HttpStatus.UNAUTHORIZED,
      );     
    }
    await this.token_emailService.VerificarYUsarTokenEmail({
      email: emp.email,
      token_email: token_email.toString(),
    });
    await this.empresaService.EliminarEmpresa(id);
    return { mensaje: 'Empresa Eliminada', Data: { result: true } };
    
  }

  @Post('/restaurar')
  async RestaurarEmpresa(
    @Req() req: Request,
    @Body() emailDTO: EmailDTO,
  ): Promise<MensajeDTO> {
      const { token_email } = req.headers;
      const emp: any = await this.empresaService.ObtenerEmpresaPorEmail(
        emailDTO.email,
      );
      if (!token_email) {
        throw new HttpException(
          'Necesitas un token_email o la empresa no existe',
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.token_emailService.VerificarYUsarTokenEmail({
        email: emp.email,
        token_email: token_email.toString(),
      });
      await this.empresaService.RestaurarEmpresa(emp._id);
      return { mensaje: 'Empresa Restaurada', Data: { result: true } };
     
  }
}
