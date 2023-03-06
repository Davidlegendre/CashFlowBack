import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  
}
