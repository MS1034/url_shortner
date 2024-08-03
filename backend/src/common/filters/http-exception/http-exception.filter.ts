import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { Request, Response } from 'express';
import { PRISMA_ERRORS } from 'src/shared/constants/prisma-errors';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const errorInfo = PRISMA_ERRORS[exception.code];
      if (errorInfo) {
        message =
          errorInfo.userMessage.replace(
            /\{([^\}]+)\}/g,
            (_, key) => (exception.meta as any)?.[key] || key,
          ) || 'An unexpected error occurred. Please try again later.';
        status = errorInfo.status;
      }
    }

    response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      message,
      exception,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    });
  }
}
