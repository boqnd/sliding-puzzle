import convict from 'convict';
import { config as envConfig } from 'dotenv';

envConfig();

const convictConfig = convict({
  db: {
    user: {
      doc: 'DB User',
      env: 'DB_USER',
      default: 'postgres',
    },
    password: {
      doc: 'DB Password',
      env: 'DB_PASSWORD',
      default: 'postgres',
    },
    database: {
      doc: 'DB database name',
      env: 'DB_NAME',
      default: 'sliding_puzzle',
    },
    host: {
      env: 'DB_HOST',
      format: 'String',
      default: 'localhost'
    },
    port: {
      env: 'DB_PORT',
      format: 'port',
      default: 5432
    }
  },
  server: {
    port: {
      doc: 'The port to bind.',
      format: 'port',
      env: 'SERVER_PORT',
      default: 3000
    }
  },
  jwt: {
    secret: {
      doc: 'JWT Secret',
      format: 'String',
      default: 'secret',
      env: 'JWT_SECRET'
    },
    expiresIn: {
      doc: 'JWT Expiration time',
      format: 'String',
      default: '2h',
      env: 'JWT_EXPIRES_IN'
    }
  }
});

convictConfig.validate();
export { convictConfig };