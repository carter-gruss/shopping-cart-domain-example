import {NextFunction, Request, Response} from 'express';
import * as winston from 'winston';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

export function logHandler(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info(`Req: ${req.path}`);
    next();
  } catch (error) {
    next(error);
  }
}
