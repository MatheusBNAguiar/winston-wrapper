import { LoggerOptions, format, transports } from "winston";
import { LogConfig } from '../type';

export function setLevel(winstonConfig: LoggerOptions, _logConfig: LogConfig) {
  const env = process.env.NODE_ENV || 'development';
  winstonConfig.level = (env === 'development') ? 'verbose' : 'info';
  return winstonConfig;
}
