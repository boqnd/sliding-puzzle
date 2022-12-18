import { convictConfig } from './config.js';
import { knexSnakeCaseMappers } from 'objection';

const config = {
  development: {
    client: 'pg',
    connection: convictConfig.get('db'),
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations'
    },
    ...knexSnakeCaseMappers()
  },
};

export default config;
