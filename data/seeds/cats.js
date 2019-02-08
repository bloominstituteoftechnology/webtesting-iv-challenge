
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cats').del()
    .then(function () {
      // Inserts seed entries
      return knex('cats').insert([
        {name: 'Negri', hungry: 1, thirsty: 1},
        {name: 'Paco', hungry: 1, thirsty: 0},
        {name: 'Michu', hungry: 0, thirsty: 0},
      ]);
    });
};
