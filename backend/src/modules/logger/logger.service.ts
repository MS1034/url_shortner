import { Injectable } from '@nestjs/common';
import { logger } from './winston.config';

@Injectable()
export class LoggerService {
  log(message: string, context?: {}) {
    logger.info(message, context);
  }

  error(message: string, trace: {}, context?: {}) {
    logger.error(message, { ...context, ...trace });
  }

  warn(message: string, context?: {}) {
    logger.warn(message, context);
  }
}
