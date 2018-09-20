
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friends').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {firstname: 'Adam', lastname: 'Lee'},
        {firstname: 'Jordan', lastname: 'Massingill'},
        {firstname: 'John', lastname: 'O\'Rourke'},
        {firstname: 'Rachel', lastname: 'DiCesare'},
        {firstname: 'Ash', lastname: 'The Man'},
        {firstname: 'Trevor', lastname: 'Elias'},
      ]);
    });
};
