
exports.up = function(knex, Promise) {
    return knex.schema.createTable('menu', tbl => {
        tbl.increments();
        tbl.string('dish', 255).notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('menu');
};
