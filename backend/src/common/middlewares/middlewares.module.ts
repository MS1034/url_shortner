import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpLoggerMiddleware } from './http-logger/http-logger.middleware';
import { LoggerService } from 'src/modules/logger/logger.service';

@Module({
  providers: [LoggerService],
})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
