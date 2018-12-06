
exports.up = function(knex, Promise) {
  return knex.schema.createTable('xfiles', tbl => {
    tbl.increments();
    tbl.string('name', 140).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('xfiles');
};
