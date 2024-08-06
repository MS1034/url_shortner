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
import { AuthGuard } from './common/guards/auth/auth.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from './modules/auth/auth.service';

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
      useClass: AuthGuard,
    },
    Reflector,
    AuthService,
  ],
})
export class AppModule {}
