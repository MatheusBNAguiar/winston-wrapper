import { Logger, createLogger, Container } from "winston";
import { LogConfig } from './type';

import { setFormat, setLevel, setTransporters } from './configs';
import { checkAndCreateFolder, pipeConfig } from './utils';

/**
 * TODO: Create container
 * TODO: Create express middleware
 */

function buildWinstonConfig(logConfig: LogConfig) {
  const { baseDirectory } = logConfig || { baseDirectory: '' };
  if (!baseDirectory) throw Error('Base directory is required');
  checkAndCreateFolder(baseDirectory);
  return pipeConfig(
    setFormat,
    setLevel,
    setTransporters
  )({}, logConfig);
}


function Log(logConfig: LogConfig): Logger {
  return createLogger(buildWinstonConfig(logConfig));
}

new Container()

export default { Log, }
