
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.increments();

    table.string('post', 280).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
};
