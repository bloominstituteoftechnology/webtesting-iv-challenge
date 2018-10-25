
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'melvin', email: 'melvin@yahoo.com'},
        {username: 'sam', email: 'sam@yahoo.com'},
        {username: 'teddy', email: 'teddy@yahoo.com'}
      ]);
    });
};
