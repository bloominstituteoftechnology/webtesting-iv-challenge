
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
      tbl.increments();

      tbl.string('class').notNullable();
      tbl.string('name').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
