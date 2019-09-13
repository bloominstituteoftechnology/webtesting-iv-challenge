
exports.seed = function(knex) {

  return knex('drink-ingredients').truncate()
    .then(function () {
      return knex('drink-ingredients').insert([
        {espresso: null, latte: null, mocha: "chocolate" },
        {espresso: null, latte: "steamed milk", mocha: "steamed milk"},
        {espresso: "espresso", latte: "espresso", mocha: "espresso"}
      ]);
    });
};
