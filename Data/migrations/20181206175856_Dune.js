
exports.up = function (knex, Promise) {
    return knex.schema.createTable('Dune', tbl => {
        tbl.increments();
        tbl.string('name', 140).notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Dune');
};
