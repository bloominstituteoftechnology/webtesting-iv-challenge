exports.up = function(knex, Promise){
  return knex.schema.createTable('songs', songs => {
    songs.increments()
    songs.string('song', 255).notNullable().unique()
    songs.foreign('id').references('library.id')
  })
}

exports.down = function(knex, Promise){
  return knex.schema.dropTableIfExists('songs')
}
