exports.up = function(knex, Promise) {
    return knex.schema.createTable("tasks", table => {
      table.increments();
      table.string("task", 500).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("tasks");
  };
