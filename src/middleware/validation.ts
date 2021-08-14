import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';

const body =
  (schema: { [key: string]: Joi.Schema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.object(schema).validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };

export default { body };
