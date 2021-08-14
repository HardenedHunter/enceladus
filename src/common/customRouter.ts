import { Router } from 'express';
import {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
  RequestHandler,
} from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { RuntimeError } from './error';

type Handler = RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
type Req = Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
type Res = Response<any, Record<string, any>, number>;

const withCatch = (callback: Handler) => async (req: Req, res: Res, next: NextFunction) => {
  try {
    await callback(req, res, next);
  } catch (e) {
    next(e);
  }
};

const wrapHandlers = (handlers: Handler[]) => {
  handlers[handlers.length - 1] = withCatch(handlers[handlers.length - 1]);
  return handlers;
};

export default class CustomRouter {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get expressRouter() {
    return this._router;
  }

  get(path: string, ...handlers: Handler[]): Router {
    if (handlers.length === 0) throw new RuntimeError(`No handlers defined for GET at ${path}.`);
    return this._router.get(path, ...wrapHandlers(handlers));
  }

  post(path: string, ...handlers: Handler[]): Router {
    if (handlers.length === 0) throw new RuntimeError(`No handlers defined for POST at ${path}.`);
    return this._router.post(path, ...wrapHandlers(handlers));
  }

  put(path: string, ...handlers: Handler[]): Router {
    if (handlers.length === 0) throw new RuntimeError(`No handlers defined for PUT at ${path}.`);
    return this._router.put(path, ...wrapHandlers(handlers));
  }

  delete(path: string, ...handlers: Handler[]): Router {
    if (handlers.length === 0) throw new RuntimeError(`No handlers defined for DELETE at ${path}.`);
    return this._router.delete(path, ...wrapHandlers(handlers));
  }
}
