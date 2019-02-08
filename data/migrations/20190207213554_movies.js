exports.up = function(knex, Promise) {
    return knex.schema.createTable("movies", table => {
      table.increments();
      table.string("movie", 500).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("movies");
  };
