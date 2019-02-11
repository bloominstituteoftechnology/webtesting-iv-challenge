
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.string('age').notNullable();
    table.boolean('married').defaultTo(false);
  
  });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('users');
};
