import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpLoggerMiddleware } from './http-logger/http-logger.middleware';
import { UrlRedirectMiddleware } from './url-redirect/url-redirect.middleware';
import { LoggerService } from 'src/modules/logger/logger.service';
import { UrlService } from 'src/modules/url/url.service';
import { UrlClickService } from 'src/modules/url-clicks/url-clicks.service';
import { IpGeolocationService } from 'src/modules/ip-geolocation/ip-geolocation.service';

@Module({
  providers: [LoggerService, UrlService, UrlClickService, IpGeolocationService],
})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');

    consumer.apply(UrlRedirectMiddleware).forRoutes('*');
  }
}
