
import { Request, Response, NextFunction } from 'express';
import config from 'src/config/config';
import { SendResponse } from 'src/Domain/Helpers/response.helper';

export function apikeyMiddleware(req: Request, res: Response, next: NextFunction) {
    const {apikey} = req.headers;
    if(apikey)
    {           
      const apikeylocal = config().apikey
      console.log({apikeylocal, apikey})
      if(apikey != apikeylocal)
      {

       return SendResponse({status: 500, mensaje: "Sin autorizacion", Data: null}, res)
      }
      next();
    }
   return SendResponse({status: 500, mensaje: "Falta ApiKey", Data: null}, res)
  
  }


