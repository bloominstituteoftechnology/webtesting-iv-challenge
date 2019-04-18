exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('bicycles')
      .truncate()
      .then(function() {
        return knex('bicycles').insert([
          { name: 'Santa Cruz' },
          { name: 'Giant' },
          { name: 'Ibis' },
          { name: 'Trek' },
        ]);
      });
  };