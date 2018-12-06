
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title: 'Pride and Prejudice'},
        {title: 'The Adventures of Huckleberry Finn'},
        {title: 'A Tale of Two Cities'}
      ]);
    });
};
