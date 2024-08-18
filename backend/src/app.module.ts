import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './modules/logger/logger.module';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { FiltersModule } from './common/filters/filters.module';
import { MiddlewaresModule } from './common/middlewares/middlewares.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { JwtOrApiKeyGuard } from './common/guards/auth/auth.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from './modules/auth/auth.service';
import { UrlModule } from './modules/url/url.module';
import { UrlService } from './modules/url/url.service';
import { LogoModule } from './modules/logo/logo.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TagsModule } from './modules/tags/tags.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { IpGeolocationService } from './modules/ip-geolocation/ip-geolocation.service';
import { CachingModule } from './modules/caching/caching.module';
import { ApiKeyModule } from './modules/api-key/api-key.module';
import { ApiKeyService } from './modules/api-key/api-key.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    UsersModule,
    DatabaseModule,
    LoggerModule,
    InterceptorsModule,
    FiltersModule,
    MiddlewaresModule,
    AuthModule,
    UrlModule,
    LogoModule,
    CloudinaryModule,
    TagsModule,
    AnalyticsModule,
    CachingModule,
    ApiKeyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtOrApiKeyGuard,
    },
    Reflector,
    AuthService,
    ApiKeyService,
    UrlService,
    IpGeolocationService,
  ],
})
export class AppModule {}
