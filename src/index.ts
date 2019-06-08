import { Logger, createLogger, Container } from "winston";
import { LogConfig, LogContainer } from './type';
import { Middleware as MiddlewareConstructor } from './middleware'
import { buildWinstonConfig } from './configs';
import { RequestHandler } from "express";

/**
 * Constructor that builds up log instance
 * @param logConfig
 */
export function Log(logConfig: LogConfig): Logger {
  return createLogger(buildWinstonConfig(logConfig));
}

export function LogContainer(logConfigs: LogConfig[]): object {
  const logContainer: LogContainer = {};
  logConfigs.forEach((logConfig: LogConfig) => {
    const { label } = logConfig;
    logContainer[label] = createLogger(buildWinstonConfig(logConfig));
  })
  return logContainer;
}

export function Middleware(logConfig: LogConfig): RequestHandler {
  const logger = createLogger(buildWinstonConfig(logConfig));
  return MiddlewareConstructor(logger);
}
