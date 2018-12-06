
exports.up = function(knex, Promise) {
    return knex.schema.createTable('thing', tbl =>{
        tbl.increments();
        tbl.string('this',255).notNullable();
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('thing');
};
