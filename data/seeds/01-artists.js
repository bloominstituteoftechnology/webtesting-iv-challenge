exports.seed = function(knex, Promise) {
  return knex('artists')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('artists').insert([
        { name: 'The Sidekicks' },
        { name: 'Radiohead' },
        { name: 'PUP' },
        { name: 'Tom Petty and the Heartbreakers' },
        { name: 'Vulfpeck' }
      ]);
    });
};
