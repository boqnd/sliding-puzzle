/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('users', (table) => {
      table.dropColumn('full_name');
      table.dropColumn('email');
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('username');
    table.dropColumn('password');
    table.string('full_name').notNullable();
    table.string('email').notNullable();
  });
};
