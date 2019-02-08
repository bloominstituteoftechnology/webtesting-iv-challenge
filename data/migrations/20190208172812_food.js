
exports.up = function(knex, Promise) {
    return knex.schema.table('cats', 
    table => {
        table.boolean('hungry');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('cats'),
    table => {
        table.dropColumn('hungry');
    }
};
