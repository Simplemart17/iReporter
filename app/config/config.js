import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
      multipleStatements: true,
    },
    logging: false,
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
      multipleStatements: true,
    },
    logging: false,
  },
};
