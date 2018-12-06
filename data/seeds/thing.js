exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("thing")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("thing").insert([{ this: "rowValue1" }, { this: "pfft" }]);
    });
};
