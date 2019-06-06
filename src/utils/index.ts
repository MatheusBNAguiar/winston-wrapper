const fs = require('fs');

import { LoggerOptions } from "winston";
import { LogConfig, LogSetter } from '../type';

/**
 * Check if folder exists
 * @param {string} baseDirectory The full path where the folder is located
 * @return { boolean }
 */
const checkFolderExistance = (baseDirectory: string) => (fs.existsSync(baseDirectory));

/**
 * Check if folder exists and in his absence
 * @param {string} baseDirectory The full path where the folder is located
 * @return { any }
 */
const checkAndCreateFolder = (baseDirectory: string) => checkFolderExistance(baseDirectory) ? null : fs.mkdirSync(baseDirectory);

/**
 * Pipe all the functions that will set the configurations on winston config
 * @param {LogSetter} fns All the options setters that will be included
 * @returns {LoggerOptions}
 */
const pipeConfig = (...fns: LogSetter[]) => (LoggerOptions: LoggerOptions, logConfig: LogConfig): LoggerOptions => fns.reduce((options, setter) => setter(options, logConfig), LoggerOptions)

export { checkAndCreateFolder, pipeConfig };
