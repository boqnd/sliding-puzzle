/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary().unique();
    table.string('full_name').notNullable();
    table.string('email').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('games', (table) => {
    table.increments('id').primary().unique();
    table.string('name').notNullable();
    table.integer('player1_id').notNullable().references('id').inTable('users');
    table.integer('player2_id').notNullable().references('id').inTable('users');
    table.integer('duration').nullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('scores', (table) => {
    table.increments('id').primary().unique();
    table.integer('size').notNullable();
    table.integer('game_id').notNullable().references('id').inTable('games');
    table.integer('score_p1').notNullable();
    table.integer('score_p2').notNullable();
    table.integer('winner').notNullable().references('id').inTable('users');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('scores');
  await knex.schema.dropTable('games');
  await knex.schema.dropTable('users');
}
