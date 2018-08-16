
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, name: 'red potion'},
        {id: 2, name: 'sword'},
        {id: 3, name: 'shield'}
      ]);
    });
};
