import express from 'express';
import logger from './common/logging';
import env from './startup/env';
import db from './startup/db';
import routes from './startup/routes';

// Errors are caught and logged by Winston
process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));

const runAssertions = async () => {
  env.assertAllVariablesExist();
  await db.assertDatabaseIsAvailable();
};

const main = async () => {
  await runAssertions();
  const app = express();
  routes.attachHandlers(app);
  const port = process.env.PORT || 9000;
  app.listen(port, () => {
    logger.info(`Listening on ${port}.`);
  });
};

main();
