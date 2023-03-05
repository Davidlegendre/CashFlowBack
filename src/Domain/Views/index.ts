import List from "./Models/list"
import { Injectable } from '@nestjs/common';

@Injectable()
export default class SwaggerCustom{

    Construir(_lista: List[])
    {
        const result =  `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Swagger Info Custom</title>
                    </head>
                    <body>
                    <div class='content-top'>
                        <div class='header'>
                            <h1>Bienvenido a CashFlowAPI</h1>
                            <h3>Esta Api es Privada</h3>
                            <p>Puede Probar las diferentes rutas de cada uno en un Client</p>
                            <p>Todos las rutas devuelven: {mensaje: string, Data: Object | Object[] | null}</p>
                        </div>
                    </div>

                        <div>`                     
                        +
                        _lista.map(e=>{                                
                            return `<div class='header-body'>
                                        <h3>${e.tituloList.titulo}</h3>
                                        <p>Modelo: ${e.tituloList.modelo}</p>
                                    </div>
                                    <div class='sub-list header-body'>
                                        ${
                                            e.listaCards.map(e2=>
                                                "<div class='card'>"+
                                                    '<h4>'+e2.ruta+'</h4>'+
                                                    '<p>Descripcion: '+e2.descripcion+'</p>'+
                                              "</div>"
                                            )
                                        }
                                    </div>`
                        })
                        +
                        `</div>                           

                        <style>
                        .content-top{
                        position: sticky;
                        top: 0;
                        flex-direction: column;
                        
                        }
                        .content-top .header{
                        box-shadow: 0 1.6px 3.6px 0 rgba(0, 0, 0, .132), 0 .3px .9px 0 rgba(0, 0, 0, .108);
                        }

                        .header-body{
                        margin: 10px;
                            background-color: whitesmoke;
                            padding:10px;
                            border-radius: 7px;
                        }
                        .header{
                            margin: 10px;
                            background-color: #eee8ff;
                            padding:10px;
                            border-radius: 7px;
                        }

                        .sub-list{
                            display: flex;
                            flex-wrap: wrap;
                            margin: 10px;
                        }

                        .card{
                            padding: 5px;
                            border-radius: 7px;
                            background-color: white;
                            box-shadow: 0 3.2px 7.2px 0 rgba(0, 0, 0, .132), 0 .6px 1.8px 0 rgba(0, 0, 0, .108);
                            margin:5px;
                        }

                        h1, h2, h3, p, span, h4 {
                            margin: 5px;
                            padding: 0px;
                            font-family: "cascadia mono"
                        }
                        </style>
                    </body>
                
                    </html>`

                    return result;
    }


}