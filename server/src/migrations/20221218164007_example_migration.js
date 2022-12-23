/* eslint-disable no-unused-vars */
/**
 * THIS IS AN EXAMPLE MIGRATION
 */


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  /**
    await knex.schema.createTable('example_table', (table) => {
    table.string('name');
    table.boolean('is_active');
    table.integer('age');
        
    // required fields for every model
    table.increments('id').primary();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
   */
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  /**
  await knex.schema.dropTable('example_table');
   */
};
