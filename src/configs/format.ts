import { LoggerOptions, format, transports } from "winston";
import { LogConfig } from '../type';

const { combine, colorize, label, timestamp, printf, json, splat } = format;

export function setFormat(winstonConfig: LoggerOptions, logConfig: LogConfig) {
  const { label: serviceLabel = '' } = logConfig;
  winstonConfig.format = combine(
    colorize(),
    splat(),
    label({ label: serviceLabel }),
    json(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(info => `[${info.timestamp}] [${info.level}] ${info.label ? `[${info.label}]` : ''} ${info.message} ${info.payload ? `-> ${JSON.stringify(info)}` : ''}`)
  );
  return winstonConfig;
}
