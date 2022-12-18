import { convictConfig } from '../../../config.js';
import config from '../../../knexfile.js';
import knex from 'Knex';


/**
 * This function creates a database for the application to use.
 * It is used in the knexfile.js file to create the database before running migrations.
 * This is done as a workaround to the fact that knex does not support creating a database.
 * It is not recommended
 * @returns Promise<void>
 */
async function createDatabase() {
  let mockConfig = config.development;
  mockConfig.connection.database = null;
  const client = knex(mockConfig);
  
  await client.raw(`CREATE DATABASE ${convictConfig.get('db.database')}`);
  await client.destroy();
}
  
createDatabase();