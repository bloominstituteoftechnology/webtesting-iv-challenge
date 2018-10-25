
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function(tbl) {
    // id
    tbl.increments();

    // flavor
    tbl.string('flavor', 128).notNullable();

    // scoop amount
    tbl.integer('scoops').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('orders');
};
