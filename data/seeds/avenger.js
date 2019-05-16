
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('avengers').del()
    .then(function () {
      // Inserts seed entries
      return knex('avengers').insert([
        {id: 1, name: 'ironman'},
        {id: 2, name: 'blackwidow'},
        {id: 3, name: 'spiderman'}
      ]);
    });
};
