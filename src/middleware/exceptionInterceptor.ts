import { ErrorRequestHandler } from 'express';
import { HttpError } from '../common/error';
import logger from '../common/logging';

export const interceptor: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.toString());
  if (err instanceof HttpError)
    return res.status(err.status).send({ message: err.message });
  return res.status(500).send({ message: 'Unknown error occured.' });
};
