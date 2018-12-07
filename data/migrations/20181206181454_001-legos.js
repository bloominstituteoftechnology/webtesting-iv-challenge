
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lego-themes', table => {
    // primary key
    // by default it generates an id field and make it autoincrement and the primary key. Default tbl.increments('id');
    table.increments(); // could change to tbl.increments('cohorts_id');

    // other fields
    table.integer('parent_id');// .references('parent.id')
    table.string('name', 255).notNullable();
    // {"id":1,"parent_id":null,"name":"Technic"}
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lego-themes');
};
