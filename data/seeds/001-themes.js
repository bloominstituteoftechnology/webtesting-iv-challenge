
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lego-themes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('lego-themes').insert([
        {"id":1,"parent_id":null,"name":"Technic"},{"id":2,"parent_id":1,"name":"Arctic Technic"}
      ]);
    });
};
