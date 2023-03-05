import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable()
export class APIKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
   
      const {apikey} = req.headers;
      if(!apikey) throw new HttpException('No esta autorizado a usar esta ruta',HttpStatus.UNAUTHORIZED)
      const key = apikey.split(' ')
      if(key[0] !== "Key" || key[1] !== Config().apikey)
      {
        throw new HttpException('No esta autorizado a usar esta ruta',HttpStatus.UNAUTHORIZED)
      }
      return true;
  }
}
