
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('names').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('names').insert([
        {name: 'nameValue1'},
        {name: 'nameValue2'},
        {name: 'nameValue3'}
      ]);
    });
};
