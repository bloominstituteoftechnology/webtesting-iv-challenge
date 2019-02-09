
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, post: 'TIL: Water account for 0.02% percent of the earths mass'},
        {id: 2, post: 'TIL: The fastest-orbiting asteroid zips around the sun in just 165 days'},
        {id: 3, post: 'TIL: Scientists in Mexico discovered how to eradicate HPV'}
      ]);
    });
};
