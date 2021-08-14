import { json, Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import auth from '../routes/auth';
import httpLogger from '../middleware/httpLogging';
import { interceptor } from '../middleware/exceptionInterceptor';

const attachHandlers = (app: Application) => {
  app.use(helmet());
  app.use(httpLogger);
  app.use(cookieParser());
  app.use(json());
  app.use('/api/auth', auth);
  app.use(interceptor);
};

export default {
  attachHandlers,
};
