import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UrlService } from 'src/modules/url/url.service';

@Injectable()
export class UrlRedirectMiddleware implements NestMiddleware {
  constructor(private readonly urlService: UrlService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const path = req.originalUrl.replace('/api/v1/', ''); // Remove leading slash
    // console.log(path);
    // console.log('path');

    if (path.length === 14 && /^[a-zA-Z0-9-_]+$/.test(path)) {
      try {
        const url = await this.urlService.findByShortUrl(path);
        if (url && url.original_url) {
          return res.redirect(302, url.original_url);
        }
      } catch (error) {
        console.error('Error finding URL:', error);
      }
    }

    next();
  }
}
