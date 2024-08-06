import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException(
          'User is not authenticated! Please sign In',
        );
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = this.authService.validateToken(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
