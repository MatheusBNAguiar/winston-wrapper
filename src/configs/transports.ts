import 'winston-daily-rotate-file';

import { LoggerOptions, transports } from "winston";
import { LogConfig } from '../type';
import { checkAndCreateFolder } from '../utils';

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
