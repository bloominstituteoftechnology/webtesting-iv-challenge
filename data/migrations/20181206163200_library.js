exports.up = function(knex, Promise){
  return knex.schema.createTable('library', library => {
    library.increments()

    library.string('artist', 128).notNullable().unique()
    library.string('album', 255).notNullable().unique()
    library.string('description').notNullable()
  })
}

exports.down = function(knex, Promise){
  return knex.schema.dropTableIfExists('library')
}
