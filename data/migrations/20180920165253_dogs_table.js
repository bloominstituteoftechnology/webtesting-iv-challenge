
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dogs', function(tbl) {
      tbl.increments();

      tbl.string('breed', 128).notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('dogs');
};
