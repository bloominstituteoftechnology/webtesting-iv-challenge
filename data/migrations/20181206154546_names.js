exports.up = function(knex, Promise) {
  return knex.schema.createTable('names', tbl => {
    tbl.increments();

    tbl.string('name', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('names');
};

