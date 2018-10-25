
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {class: 'iOS1', name: 'Gwenevere Clarkson'},
        {class: 'FSW6', name: 'Alia Abbate'},
        {class: 'UX2', name: 'Allon Roy'}
      ]);
    });
};
