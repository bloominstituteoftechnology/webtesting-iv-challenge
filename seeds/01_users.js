
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: 'Joe', password: 'password'},
        {username: 'Jim', password: 'password'},
        {username: 'Carl', password: 'password'}
      ]);
    });
};
