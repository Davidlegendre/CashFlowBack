import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    
    
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    //si el rol del usuario esta dentro del array de roles
    const result = roles.includes(user.rol)
    if(!result) throw new HttpException('No tiene autorizacion',HttpStatus.UNAUTHORIZED)   
    return result
  }
}
