
exports.up = function(knex, Promise) {
    return knex.schema.table('cats', 
    table => {
        table.boolean('thirsty');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('cats'),
    table => {
        table.dropColumn('thirsty');
    }
};