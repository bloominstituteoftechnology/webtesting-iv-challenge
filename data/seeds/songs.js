exports.seed = function(knex, Promise){
  // Deletes ALL existing entries
  return knex('songs').truncate().then(function(){
    // Inserts seed entries
    return knex('songs').insert([
      { song: 'A song', artist_id: 1 },
      { song: 'Another song', artist_id: 2 },
      { song: 'And another song', artist_id: 1 },
    ])
  })
}
