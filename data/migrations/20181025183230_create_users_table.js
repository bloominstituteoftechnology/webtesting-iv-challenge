
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username', 255')
      .notNullable()
      .unique();
    table.integer('age').notNullable();
    table.string('department', 255')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
