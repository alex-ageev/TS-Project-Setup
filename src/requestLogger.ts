// requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger from './logger.js';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = new Date().getTime();
  const { method, originalUrl } = req;

  res.on('close', () => {
    const end = new Date().getTime();
    const duration = end - start;
    const statusCode = res.statusCode;

    if (
      originalUrl.includes('.js') ||
      originalUrl.includes('.css') ||
      originalUrl.includes('.png') ||
      originalUrl.includes('.jpg') ||
      originalUrl.includes('.ico')
    ) {
      return;
    }

    const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;
    logger.http(logMessage);
  });

  next();
};

export default requestLogger;