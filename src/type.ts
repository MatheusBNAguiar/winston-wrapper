import { LoggerOptions } from "winston";

export interface LogTransporters {
  date: boolean;
  file: boolean;
  console: boolean;
}

export interface LogConfig {
  baseDirectory: string ;
  label: string;
  infoLevel?: string;
  transporters: LogTransporters;
}

export interface LogSetter {
  (LoggerOptions: LoggerOptions, logConfig: LogConfig): LoggerOptions;
};
