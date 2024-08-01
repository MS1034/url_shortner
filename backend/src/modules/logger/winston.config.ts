import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ENVIRONMENT_NAMES } from 'src/shared/constants/envitonments';

const logDir = 'logs';

const transportOptions = (level: string) => ({
  filename: `${logDir}/${level}.log`,
  zippedArchive: true,
  level: level,
  maxSize: '20m',
  maxFiles: '14d',
});

const transports = [];

if (process.env.NODE_ENV === ENVIRONMENT_NAMES.DEVELOPMENT.toString()) {
  transports.push(new winston.transports.Console());
} else {
  transports.push(new DailyRotateFile(transportOptions('info')));
  transports.push(new DailyRotateFile(transportOptions('error')));
  transports.push(new DailyRotateFile(transportOptions('warning')));
}

export const winstonOptions: winston.LoggerOptions = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
  transports: transports,
};

export const logger = winston.createLogger({
  ...winstonOptions,
});
