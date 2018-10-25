exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments();
    t.string("username", 255)
      .notNullable()
      .unique();
    t.integer("age").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
