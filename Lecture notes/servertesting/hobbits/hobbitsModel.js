const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  // getAll,
  // findById
};

async function insert(hobbit) {
  // [ 1 ]
  const [id] = await db('hobbits').insert(hobbit);

  return db('hobbits')
    .where({ id })
    .first();
}
