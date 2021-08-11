import config from 'config';
import { EnvironmentVariableError } from './error';
import logger from './logging';

const variables = [
  'jwtPrivateKey',
  'connectionString',
  'clientOrigin',
] as const;

type EnvironmentVariable = typeof variables[number];

const get = (variable: EnvironmentVariable): string => config.get(variable);

const assertAllVariablesExist = () => {
  logger.info('Looking for environment variables...');
  variables.forEach((v) => {
    try {
      get(v);
    } catch {
      throw new EnvironmentVariableError(
        `Environment variable not found: ${v}.`
      );
    }
  });
  logger.info('All variables have been found.');
};

export default {
  get,
  assertAllVariablesExist,
};
