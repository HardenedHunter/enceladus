import path from 'path';
import { createLogger, transports, format, addColors } from 'winston';
import { FileTransportOptions } from 'winston/lib/winston/transports';

const logDirectory = path.join(__dirname, '../../logs');

const logLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logFileSize = 1024 * 1024 * 5; // 5 Mb

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
});

const errorFileOptions: FileTransportOptions = {
  level: 'error',
  handleExceptions: true,
  filename: `${logDirectory}/errors.log`,
  maxsize: logFileSize,
  maxFiles: 1,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.ms' }),
    format.json()
  ),
};

const infoFileOptions: FileTransportOptions = {
  handleExceptions: true,
  filename: `${logDirectory}/all.log`,
  maxsize: logFileSize,
  maxFiles: 1,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.ms' }),
    format.json()
  ),
};

const consoleOptions: FileTransportOptions = {
  handleExceptions: true,
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.ms' }),
    logFormat
  ),
};

const logger = createLogger({
  level: logLevel,
  transports: [
    new transports.File(errorFileOptions),
    new transports.File(infoFileOptions),
    new transports.Console(consoleOptions),
  ],
  exitOnError: false,
});

export default logger;
