exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("puppies")
    .truncate()
    .then(function() {
      return knex("puppies").insert([
        { name: "Poodle" },
        { name: "Retriever" },
        { name: "Rottweiler" },
        { name: "Doberman" }
      ]);
    });
};
