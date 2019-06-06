import { LoggerOptions } from "winston";
import { LogConfig } from '../type';
import { checkAndCreateFolder, pipeConfig } from '../utils';

import { setFormat } from './format';
import { setLevel } from './level';
import { setTransporters } from './transports';

export function buildWinstonConfig(logConfig: LogConfig): LoggerOptions {
  const { baseDirectory } = logConfig || { baseDirectory: '' };
  if (!baseDirectory) throw Error('Base directory is required');
  checkAndCreateFolder(baseDirectory);
  return pipeConfig(
    setFormat,
    setLevel,
    setTransporters
  )({}, logConfig);
}
