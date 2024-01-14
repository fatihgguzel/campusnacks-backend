// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const db = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'postgres',
  dialect: 'postgres',
  logging: undefined,
};

module.exports = {
  development: db,
  test: db,
  production: db,
  db,
};
