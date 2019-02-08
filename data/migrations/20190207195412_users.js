exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();

    tbl.string('name', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
