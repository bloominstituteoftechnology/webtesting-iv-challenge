
exports.up = function(knex) {
  return knex.schema.createTable(
      'drink-ingredients', tbl => {
      tbl.increments(),
      tbl.text('espresso'),
      tbl.text('latte'),
      tbl.text('mocha')
      })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('drink-ingredients')
};
