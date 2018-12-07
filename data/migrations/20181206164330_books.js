
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', books => {
    books.increments();
    books.string('title', 255).notNullable();
    books.string('author', 255).notNullable();
    books.string('isbn', 13).notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('books');
};
