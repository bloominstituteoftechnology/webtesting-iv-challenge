exports.up = function(knex, Promise){
  return knex.schema.createTable('songs', songs => {
    songs.increments()
    songs.string('song', 255).notNullable().unique()
    songs.integer('artist_id').unsigned().notNullable()
    songs.foreign('artist_id').references('library.id')
  })
}

exports.down = function(knex, Promise){
  return knex.schema.dropTableIfExists('songs')
}
