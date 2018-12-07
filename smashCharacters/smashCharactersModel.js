const db = require('../data/dbConfig.js');

module.exports = {
  insert
  // update,
  // remove,
  // getAll,
  // findById
};

async function insert(hobbit) {
  // [ 1 ]
  const [id] = await db('smashCharacters').insert(hobbit);

  return db('smashCharacters')
    .where({ id })
    .first();
}
