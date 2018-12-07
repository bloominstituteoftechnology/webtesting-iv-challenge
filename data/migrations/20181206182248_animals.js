exports.up = function(knex, Promise) {
  return knex.schema.createTable("animals", tbl => {
    tbl.increments();

    tbl.string("name", 255).notNullable();
    tbl.string("species", 255).notNullable();
    tbl.int("age");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("animals");
};
