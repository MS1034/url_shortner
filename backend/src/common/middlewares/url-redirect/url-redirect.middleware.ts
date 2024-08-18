import { Injectable, NestMiddleware } from '@nestjs/common';
import { StatusEnum } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { UrlService } from 'src/modules/url/url.service';
import { UrlClickService } from 'src/modules/url-clicks/url-clicks.service';
import { IpGeolocationService } from 'src/modules/ip-geolocation/ip-geolocation.service';

@Injectable()
export class UrlRedirectMiddleware implements NestMiddleware {
  constructor(
    private readonly urlService: UrlService,
    private readonly urlClickService: UrlClickService,
    private readonly ipGeolocationService: IpGeolocationService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const path = req.originalUrl.replace('/api/v1/', ''); // Remove leading slash
    const { headers, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const referrer = headers.referer;
    const accessDate = new Date();
    const accessTime = new Date();

    // Proceed to next middleware/route if URL path does not match expected pattern
    if (!path || path.length !== 14 || !/^[a-zA-Z0-9-_]+$/.test(path)) {
      return next();
    }

    try {
      const location = await this.ipGeolocationService.getLocation(ip);
      const country = location.country || 'Unknown';
      const city = location.city || 'Unknown';

      const url = await this.urlService.findByShortUrl(path);

      if (
        url &&
        url.original_url &&
        !url.is_deleted &&
        (url.expiration_date == null || url.expiration_date > new Date()) &&
        url.status === StatusEnum.ACTIVE
      ) {
        // Log the click before redirecting
        await this.urlClickService.logClick({
          urlId: url.url_id,
          ipAddress: ip,
          userAgent,
          referrer,
          country,
          city,
          accessDate,
          accessTime,
        });

        return res.redirect(302, url.original_url);
      }

      // Return a 404 response if URL is not found or not valid
      res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Not Found</title>
            <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
            <style>
                .hero-section img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
                <p class="text-lg mb-6">It looks like the page you’re looking for doesn’t exist or might have moved. Don’t worry, though – you can navigate back to the Home page. Sorry for the inconvenience!</p>
                <a href="/" class="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Back Home</a>
            </div>
            <div class="hero-section mt-12 max-w-4xl text-center">
                <h2 class="text-2xl font-bold mb-4">Shrink Your Links, Expand Your Reach</h2>
                <p class="mb-6">link.ly makes it simple to create short, easy-to-share URLs for all your needs. Track clicks, manage links, and much more.</p>
                <form name="shorten-form" method="get" class="flex justify-center mb-6">
                    <input type="url" id="url" placeholder="Enter URL" name="url" class="border border-gray-300 rounded-l-lg px-4 py-2 w-64">
                    <button type="submit" class="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600">Shorten</button>
                </form>
                <img src="/assets/images/green-qr-code-concept.png" alt="Hero Image" class="mx-auto">
                <div class="mt-6 flex justify-around max-w-2xl mx-auto">
                    <div>
                        <h3 class="text-xl font-bold">50K+</h3>
                        <p class="text-sm text-gray-600">Links Shortened</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">1M+</h3>
                        <p class="text-sm text-gray-600">Clicks Tracked</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">10K+</h3>
                        <p class="text-sm text-gray-600">Happy Users</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `);
    } catch (error) {
      console.error('Error processing request:', error);
      throw Error(error);
    }
  }
}
