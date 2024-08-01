import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ENVIRONMENT_NAMES } from 'src/shared/constants/envitonments';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  isErroneousStatusCode(statusCode: number) {
    return statusCode >= 400 && statusCode < 600;
  }

  //middleware
  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { method, originalUrl, body, ip, query, headers, params } = request;
    const userAgent = request.get('user-agent') || '';

    this.loggerService.log(
      `[REQ] ${userAgent}  ${ip}  ${method} ${originalUrl} ${JSON.stringify(body)}`,
    );

    var oldWrite = response.write;
    var oldEnd = response.end;
    var chunks = [];
    response.write = function (chunk: any) {
      chunks.push(chunk);
      return oldWrite.apply(response, arguments);
    };
    response.end = function (chunk: any) {
      if (chunk) {
        chunks.push(chunk);
      }
      return oldEnd.apply(response, arguments);
    };

    response.on('finish', () => {
      const diff = process.hrtime(startAt);
      const responseTimeInt = diff[0] * 1e3 + diff[1] * 1e-6;
      const responseTime = `+${Math.floor(responseTimeInt)}ms`;
      const contentLength = response.get('content-length');
      const { statusCode } = response;
      const responseBody = Buffer.concat(chunks).toString('utf8');

      //TODO: Pass error trace here after standarizing the error response
      if (this.isErroneousStatusCode(statusCode))
        this.loggerService.error(
          `[RESP] ${userAgent}  ${ip}  ${method} ${originalUrl} ${query} ${headers} ${params} ${statusCode} ${contentLength} ${responseTime} ${responseBody}`,
          {},
        );
      else
        this.loggerService.log(
          `[RESP] ${userAgent}  ${ip}  ${method} ${originalUrl} ${statusCode} ${contentLength} ${responseTime} ${responseBody}`,
        );
    });

    next();
  }
}
