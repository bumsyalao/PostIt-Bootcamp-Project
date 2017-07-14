require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'password12',
    database: 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
