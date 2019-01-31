exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { name: 'Johny Appleseed', "favorite_movie": "Die hard" },
        { name: 'Bob Cucumber', "favorite_movie": "Die hard" },
        { name: 'Maria Strawberryhead', "favorite_movie": "Die hard" },
        { name: 'Peter Potato', "favorite_movie": "Die hard" },
      ]);
    });
};