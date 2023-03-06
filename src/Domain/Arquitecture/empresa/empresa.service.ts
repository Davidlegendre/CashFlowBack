import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Empresa, Empresa_Document } from '../../schemas/Empresa-model';

@Injectable({ scope: Scope.DEFAULT })
export class EmpresaService {
  constructor(
    @InjectModel(Empresa.name)
    private readonly empresaModel: Model<Empresa_Document>
  ) {}

  async ObtenerTodasLasEmpresas(): Promise<Empresa[]> {
    const result = await this.empresaModel.find();
    if(!result) throw new HttpException('No hay Empresas', HttpStatus.NOT_FOUND)
    return result;
  }

  async ObtenerEmpresaPorEmail(email: string): Promise<Empresa>
  {
    const result = await this.empresaModel.findOne({email: email})
    if(!result) throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND)
    return result

  }

  async ObtenerUnaEmpresa(_id: string): Promise<Empresa> {
    const result = await this.empresaModel.findById(_id);
    if(!result) throw new HttpException('Empresa no encontrada',HttpStatus.NOT_FOUND)
    if(!result.IsActive) throw new HttpException('Empresa no Encontrada',HttpStatus.NOT_FOUND)
    return result
  }

  async CrearEmpresa(empresa: Empresa): Promise<Empresa> {
      const result = await this.empresaModel.create(empresa);
      if(!result) throw new HttpException('Empresa no creada',HttpStatus.NOT_MODIFIED)
      return await result.save();
  }

  async ActualizarEmpresa(_id: string,empresa: Empresa): Promise<Empresa>{
    
      await this.ObtenerUnaEmpresa(_id)

      const result = await this.empresaModel.findByIdAndUpdate(_id, {
        nombreempresa: empresa.nombreempresa,
        email: empresa.email
      })

      if(!result) throw new HttpException('Empresa no actualizada', HttpStatus.NOT_MODIFIED)
      return await result.save()
  }

  async EliminarEmpresa(_id: string): Promise<Empresa>{
   
    await this.ObtenerUnaEmpresa(_id)

      const result = this.empresaModel.findByIdAndUpdate(_id,{IsActive: false})
      if(!result) throw new HttpException('Empresa no eliminada',HttpStatus.NOT_MODIFIED)
      return result;
  }

  async RestaurarEmpresa(id: string): Promise<Empresa>{
   
      const result = await this.empresaModel.findByIdAndUpdate(id,{IsActive: true})
      if(!result) throw new HttpException('Empresa no restaurada',HttpStatus.NOT_MODIFIED)
    return result;
  }
  
  async ActualizarLogo(logo: string, _id: string): Promise<Empresa>{
    
     await this.ObtenerUnaEmpresa(_id)

      const result = await this.empresaModel.findByIdAndUpdate(_id, {logo: logo});
      if(!result) throw new HttpException("EL logo no ha sido actualizado", HttpStatus.NOT_MODIFIED)
      return result;
  } 
}
