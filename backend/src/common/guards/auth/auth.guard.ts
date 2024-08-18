import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrApiKeyGuard extends AuthGuard(['jwt', 'api-key']) {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtAuthGuard = new (AuthGuard('jwt'))();
    const apiKeyAuthGuard = new (AuthGuard('api-key'))();

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    try {
      const jwtResult = await jwtAuthGuard.canActivate(context);
      if (jwtResult) {
        return true;
      }
    } catch (error) {}

    try {
      const apiKeyResult = await apiKeyAuthGuard.canActivate(context);
      if (apiKeyResult) {
        return true;
      }
    } catch (error) {}

    throw new UnauthorizedException(
      'Authentication failed. You must provide a valid JWT or API Key.',
    );
  }
}
