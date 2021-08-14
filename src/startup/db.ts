import sequelize from '../common/db';
import logger from '../common/logging';

export const assertDatabaseIsAvailable = async () => {
  try {
    logger.info('Establishing database connection...');
    await sequelize.authenticate();
    logger.info('Database connection has been established.');
    logger.info('Synchronizing model data...');
    await sequelize.sync({ alter: true });
    logger.info('Model data has been synchronized.');
  } catch (error) {
    console.error(error);
    logger.error('Unable to connect to the database.');
    process.exit(1);
  }
};

export default {
  assertDatabaseIsAvailable,
};
