
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('characters').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([
        {name: 'The Gunslinger',},
        {name: 'The man in black',},
        {name: 'Hawk',}
      ]);
    });
};