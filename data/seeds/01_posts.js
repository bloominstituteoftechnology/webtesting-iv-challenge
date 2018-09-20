
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, text: 'Sample Post 1'},
        {id: 2, text: 'Sample Post 2'},
        {id: 3, text: 'Sample Post 3'}
      ]);
    });
};
