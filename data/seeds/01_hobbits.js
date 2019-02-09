
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hobbits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('hobbits').insert([
        {name: 'Giannis'},
        {name: 'Stephen'},
        {name: 'Joel'}
      ]);
    });
};
