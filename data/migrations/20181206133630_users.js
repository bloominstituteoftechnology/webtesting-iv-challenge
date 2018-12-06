
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', user => {
    user.increments();

    user.string('name', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('users');
};
