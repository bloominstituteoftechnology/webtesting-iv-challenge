
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', tbl => {
      tbl.increments();
      tbl.string('title', 250).notNullable;
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.deopTableIfExists('books');
};
