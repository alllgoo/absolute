import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
    winston.format.colorize({ all: true })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export class Logger {
  static info(message: string) {
    logger.info(message);
  }

  static error(message: string | Error) {
    if (message instanceof Error) {
      logger.error(message.stack || message.message);
    } else {
      logger.error(message);
    }
  }

  static warn(message: string) {
    logger.warn(message);
  }

  static debug(message: string) {
    logger.debug(message);
  }

  static verbose(message: string) {
    logger.verbose(message);
  }
}
