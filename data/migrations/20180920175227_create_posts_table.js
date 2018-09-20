
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
    tbl.increments();

    tbl
      .string('text', 255)
      .notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
