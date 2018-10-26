
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pets', function(tbl) {
    // primary key called id
    tbl.increments(); // by default creates and id field

    tbl.string('petsName', 40).notNullable();

  });
};

exports.down = function(knex, Promise) {
  // rollback
  return knex.schema.dropTableIfExists('pets');
};
