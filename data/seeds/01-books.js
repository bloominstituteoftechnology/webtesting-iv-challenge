
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        { 
          id: 1, 
          title: 'The Road',
          author: 'Cormac McCarthy',
          isbn: '9780307387899'
        }
      ]);
    });
};
