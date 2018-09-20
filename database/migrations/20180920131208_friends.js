exports.up = function(knex, Promise) {
  return knex.schema.createTable("friends", function(tbl) {
    tbl.increments("id");
    tbl.string("firstname").notNullable();
    tbl.string("lastname").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("friends", function(tbl) {
    tbl.dropColumn("friends");
  });
};
