exports.up = function(knex, Promise) {
    return knex.schema.createTable('avengers', tbl => {
      tbl.increments();
      tbl.string('name', 200).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    // undo the operation in up
    return knex.schema.dropTableIfExists('avengers');
  };
  