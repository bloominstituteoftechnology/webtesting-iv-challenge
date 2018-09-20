exports.seed = (knex, Promise) => {
  return knex('forms').truncate()
    .then(() => {
      return knex('forms').insert([
        { some_data: { 'rowValue1': 1 } },
        { some_data: { 'rowValue2': 2 } },
        { some_data: { 'rowValue3': 3 } }
      ]);
    });
};
