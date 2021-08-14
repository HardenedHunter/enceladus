import config from 'config';

export const variables = [
  'jwtPrivateKey',
  'connectionString',
  'clientOrigin',
] as const;

export type EnvironmentVariable = typeof variables[number];

const get = (variable: EnvironmentVariable): string => config.get(variable);

export default {
  get,
};
