
exports.up = function(knex, Promise) {
    return knex.schema.createTable('items', function (table) {
        table.increments();
        table.string('name').unique().notNullable();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('items');
};
