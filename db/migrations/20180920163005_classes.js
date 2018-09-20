exports.up = function(knex, Promise) {
  return knex.schema.createTable("classes", tbl => {
    tbl.increments();

    tbl.string("name").notNullable();

    tbl.string("track").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("classes");
};
