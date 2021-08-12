import { Sequelize } from 'sequelize-typescript';
import _ from 'lodash';
import path from 'path';
import env from './env';

const modelDirectory = path.join(__dirname, '../models');

export default new Sequelize(env.get('connectionString'), {
  logging: false,
  models: [modelDirectory],
  modelMatch: (filename, member) => {
    return filename === _.camelCase(member);
  },
});
