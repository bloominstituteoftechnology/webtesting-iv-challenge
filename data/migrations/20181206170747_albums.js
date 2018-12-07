exports.up = function(knex, Promise) {
  return knex.schema.createTable('albums', album => {
    album.increments();

    album.string('name', 255).notNullable();
    album.string('title', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('albums');
};
