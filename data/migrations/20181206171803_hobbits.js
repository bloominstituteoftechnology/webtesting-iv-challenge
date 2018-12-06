exports.up = function(knex, Promise) {
  return knex.schema.createTable("hobbits", tbl => {
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists("hobbits");
};
