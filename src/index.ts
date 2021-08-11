import express from 'express';
import env from './common/env';
import logger from './common/logging';
import httpLogger from './middleware/httpLogging';

// Errors are caught and logged by Winston
process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));

env.assertAllVariablesExist();

const app = express();

app.use(httpLogger);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  logger.info(`Listening on ${port}.`);
});
