
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('musicians').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('musicians').insert([
        { name: 'Eman' },
        { name: 'Brock' },
        { name: 'Julian' },
        { name: 'Austin' },
      ]);
    });
};
