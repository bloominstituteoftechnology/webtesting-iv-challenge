exports.up = (knex, Promise) => {
  return knex.schema.createTable('forms', (tbl) => {
    tbl.increments();
    tbl.json('some_data');
    tbl.timestamp('submitted_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('forms');
};
