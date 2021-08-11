import express from 'express';
import logger from './common/logging';
import morganLogger from './middleware/httpLogging';

const app = express();

const port = process.env.PORT || 9000;

app.use(morganLogger);

app.listen(port, () => {
  logger.info(`Listening on ${port}...`);
});
