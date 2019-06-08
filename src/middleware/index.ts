import { Logger, Container } from "winston";
import { RequestHandler } from 'express';

import { customLogFunction } from './customize'
import { logReplacer } from './replace';
import uuidv1 from 'uuid/v1';

const injectRouteInfo = (req: any) => {
  req.uuid = uuidv1();
}

export function Middleware(logger: Logger, message: string = 'Accessed route'): RequestHandler {
  return (req: any, _res: any, next: Function) => {
    injectRouteInfo(req);
    const functionReplacer = customLogFunction(req);
    logReplacer(logger, functionReplacer);
    req.apiLogger = logger;
    logger.info(message);
    next();
  }
}
