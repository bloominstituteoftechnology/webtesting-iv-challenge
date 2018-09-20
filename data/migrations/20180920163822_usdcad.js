
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usdcad', function(tbl){
    tbl.increments();
    tbl.date('date')
    tbl.float('open', 5);
    tbl.float('high', 5);
    tbl.float('low', 5);
    tbl.float('close', 5);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('usdcad')
};
