import sequelize from '../common/db';
import logger from '../common/logging';
import env, { variables } from '../common/env';
import { EnvironmentVariableError } from '../common/error';

export const assertAllVariablesExist = () => {
  logger.info('Looking for environment variables...');
  variables.forEach((v) => {
    try {
      env.get(v);
    } catch {
      throw new EnvironmentVariableError(
        `Environment variable not found: ${v}.`
      );
    }
  });
  logger.info('All variables have been found.');
};

export default {
  assertAllVariablesExist,
};
