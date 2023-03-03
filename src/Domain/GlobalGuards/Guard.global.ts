import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable()
export class APIKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
    try {
      const {apikey} = req.headers;
      const key = apikey.split(' ')

      if(key[0] === "Key"&&key[1] === Config().apikey)
      {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }   
  }
}
