import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { ApiKeyService } from './api-key.service';
import { User } from '@prisma/client';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private apiKeyService: ApiKeyService) {
    super({ header: 'x-api-key', prefix: '' }, true, async (apikey, done) => {
      try {
        const user = await this.validate(apikey);
        if (!user) {
          return done(new UnauthorizedException(), false);
        }
        return done(null, user); // Pass the user object to be set on req.user
      } catch (error) {
        return done(error, false);
      }
    });
  }

  async validate(apikey: string): Promise<User | null> {
    const user = await this.apiKeyService.validateApiKey(apikey);
    if (user) {
      return user;
    }
    return null;
  }
}
