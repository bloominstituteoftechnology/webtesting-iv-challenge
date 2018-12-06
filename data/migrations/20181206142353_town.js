exports.up = function(knex, Promise) {
    return knex.schema.createTable('town', tbl  => {
      tbl.increments();
      tbl.string('name', 248).notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('town');
  };
  