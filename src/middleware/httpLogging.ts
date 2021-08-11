import morgan, { StreamOptions } from 'morgan';
import logger from '../common/logging';

const stream: StreamOptions = {
  write: (message) =>
    logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const logFormat = ':method :url :status - :response-time ms';

const morganLogger = morgan(logFormat, { stream });

export default morganLogger;
