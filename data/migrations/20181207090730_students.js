exports.up = function(knex) {
  return knex.schema.createTable("students", student => {
    student.increments();

    student
      .string("name", 128)
      .notNullable()
      .unique();
    student.string("email", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("student");
};
