import 'winston-daily-rotate-file';
import { LoggerOptions, format, transports } from "winston";
import { LogConfig } from '../type';
import { checkAndCreateFolder } from '../utils';

const { combine, colorize, label, timestamp, printf, json, splat } = format;

export function setLevel(winstonConfig: LoggerOptions, _logConfig: LogConfig) {
  const env = process.env.NODE_ENV || 'development';
  winstonConfig.level = (env === 'development') ? 'verbose' : 'info';
  return winstonConfig;
}

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

export function setTransporters(winstonConfig: LoggerOptions, logConfig: LogConfig) {
  const { label = '', transporters, baseDirectory } = logConfig
  const { date, file, console: hasConsole } = transporters || { date: true, file: true, console: true }
  const winstonTransporters = [];
  const logDirectory = `${baseDirectory}/log/`;

  function baseConfigsGenerator(sufix: string) {
    const config = { filename: `${logDirectory}${sufix}` };
    checkAndCreateFolder(logDirectory);
    return config;
  }

  if (hasConsole) {
    winstonTransporters.push(new transports.Console());
  }

  if (date) {
    winstonTransporters.push(new transports.DailyRotateFile({
      ...baseConfigsGenerator(`%DATE%-general.log`),
      datePattern: 'YYYY-MM-DD'
    }));
    if (label) {
      winstonTransporters.push(new transports.DailyRotateFile({
        ...baseConfigsGenerator(`%DATE%-${label}.log`),
        datePattern: 'YYYY-MM-DD'
      }));
    }
  }


  if (file) {
    winstonTransporters.push(new transports.File(baseConfigsGenerator('general.log')));
    if (label) {
      winstonTransporters.push(new transports.File(baseConfigsGenerator(`${label}.log`)));
    }
  }

  winstonConfig.transports = winstonTransporters;
  return winstonConfig;
}
