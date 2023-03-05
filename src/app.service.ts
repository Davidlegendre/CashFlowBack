import { Injectable } from '@nestjs/common';
import SwaggerCustom from './Domain/Views';

@Injectable()
export class AppService {

  constructor(private readonly swaggerCustom: SwaggerCustom){}

   Swagger() {

    return  this.swaggerCustom.Construir([
      {
        tituloList: { titulo: "Rutas de Banco", modelo: "{ _id: ObjectId, bancodescrip: string, logo: string, URL: string }" },
        listaCards: [
          {
            ruta: '/banco/all',
            descripcion: "Obtiene una lista de bancos registrados"
          },
          {
            ruta: '/banco/one/id',
            descripcion: "Obtiene un banco segun id"
          }
        ],
       
      },
      {
        tituloList: { titulo: "Rutas de Estado", modelo: "{ _id: ObjectId, decrip: string, Num: number }" },
        listaCards: [
          {
            ruta: '/estado/all',
            descripcion: "Obtiene una lista de estados registrados"
          },
          {
            ruta: '/estado/one/id',
            descripcion: "Obtiene un estado por id"
          },
          {
            ruta: '/estado/porNum/num',
            descripcion: "Obtiene un estado por el Num"
          }
        ]
      },
      {
        tituloList: { titulo: "Rutas de Genero", modelo: "{ _id: ObjectId, decrip: string }" },
        listaCards: [
          {
            ruta: '/genero/all',
            descripcion: "Obtiene una lista de generos registrados"
          },
          {
            ruta: '/genero/one/id',
            descripcion: "Obtiene un genero por id"
          }
        ]
      },
      {
        tituloList: { titulo: "Rutas de Tipo de Identificacion", modelo: "{ _id: ObjectId, decrip: string }" },
        listaCards: [
          {
            ruta: '/tipo-identificacion/all',
            descripcion: "Obtiene una lista de Tipo de Identificaciones registrados"
          },
          {
            ruta: '/tipo-identificacion/one/id',
            descripcion: "Obtiene un Tipo de Identificacion por id"
          }
        ]
      },
      {
        tituloList: { titulo: "Rutas de Tipo de Orden", modelo: "{ _id: ObjectId, decrip: string }" },
        listaCards: [
          {
            ruta: '/tipo-ordenes/all',
            descripcion: "Obtiene una lista de Tipo de Ordenes registrados"
          },
          {
            ruta: '/tipo-ordenes/one/id',
            descripcion: "Obtiene un Tipo de Orden por id"
          }
        ]
      },
      {
        tituloList: { titulo: "Rutas de Tipo de Usuario", modelo: "{ _id: ObjectId, decrip: string, Code: string }" },
        listaCards: [
          {
            ruta: '/tipo-usuario/all',
            descripcion: "Obtiene una lista de Tipo de Usuarios registrados"
          },
          {
            ruta: '/tipo-usuario/one/id',
            descripcion: "Obtiene un Tipo de Usuario por id"
          },
          {
            ruta: '/tipo-usuario/porCode/code',
            descripcion: "Obtiene un Tipo de Usuario por Code"
          }
        ]
      }
    ]);
  }
}
