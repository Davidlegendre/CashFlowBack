import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Empresa, Empresa_Document } from '../../schemas/Empresa-model';

@Injectable({ scope: Scope.DEFAULT })
export class EmpresaService {
  constructor(
    @InjectModel(Empresa.name)
    private readonly empresaModel: Model<Empresa_Document>,
  ) {}

  async ObtenerTodasLasEmpresas(): Promise<Empresa[]> {
    return await this.empresaModel.find();
  }

  async ObtenerUnaEmpresa(_id: string): Promise<Empresa> {
    return await this.empresaModel.findById(_id);
  }

  async CrearEmpresa(empresa: Empresa): Promise<Empresa> {
    try {
      const result = await this.empresaModel.create(empresa);
      return result.save();
    } catch (error) {
      return null;
    }
  }

  async CrearLogo(logo: string, _id: string): Promise<boolean> {
    try {
      const result = await this.empresaModel.findByIdAndUpdate(_id, {
        logo: logo,
      });
      return !result;
    } catch (error) {
      return false;
    }
  }
}
