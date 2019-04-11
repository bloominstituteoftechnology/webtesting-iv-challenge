exports.up = function(knex, Promise) {
  return knex.schema.createTable("smurfs", tbl => {
    tbl.increments();
    tbl.string("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("smurfs");
};
