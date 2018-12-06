exports.seed = function(knex, Promise){
  // Deletes ALL existing entries
  return knex('library').truncate().then(function(){
    // Inserts seed entries
    return knex('library').insert([
      {
        id: 1,
        artist: 'Janis',
        album: 'The Pearl',
        description: 'blah',
  
      },
    ])
  })
}
