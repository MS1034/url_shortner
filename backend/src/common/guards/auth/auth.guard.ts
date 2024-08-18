// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

// @Injectable()
// export class AuthGuard extends NestAuthGuard('jwt') {
//   // Use 'jwt' strategy here
//   constructor(private readonly reflector: Reflector) {
//     super();
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.get<boolean>(
//       'isPublic',
//       context.getHandler(),
//     );

//     if (isPublic) {
//       return true;
//     }

//     try {
//       return (await super.canActivate(context)) as boolean;
//     } catch (error) {
//       throw new ForbiddenException(
//         error.message || 'Session expired! Please sign in',
//       );
//     }
//   }
// }
// jwt-or-api-key.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrApiKeyGuard extends AuthGuard(['jwt', 'api-key']) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Try JWT first
    const jwtAuthGuard = new (AuthGuard('jwt'))();
    const apiKeyAuthGuard = new (AuthGuard('api-key'))();

    try {
      const jwtResult = await jwtAuthGuard.canActivate(context);
      if (jwtResult) {
        return true;
      }
    } catch (error) {}

    try {
      console.log('apiKeyResult', 'Subhan');

      const apiKeyResult = await apiKeyAuthGuard.canActivate(context);
      console.log(apiKeyResult, 'Subhan');
      if (apiKeyResult) {
        return true;
      }
    } catch (error) {}

    throw new UnauthorizedException(
      'Authentication failed. You must provide a valid JWT or API Key.',
    );
  }
}
