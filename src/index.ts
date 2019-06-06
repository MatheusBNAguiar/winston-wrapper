import { Logger, createLogger, Container } from "winston";
import { LogConfig } from './type';

import { buildWinstonConfig } from './configs';

/**
 * Constructor that builds up log instance
 * @param logConfig
 */
export function Log(logConfig: LogConfig): Logger {
  return createLogger(buildWinstonConfig(logConfig));
}
