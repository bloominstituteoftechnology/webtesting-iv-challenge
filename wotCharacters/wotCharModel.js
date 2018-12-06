const db = require('../data/dbConfig.js');

module.exports = {
  insert
  // update,
  // remove,
  // getAll,
  // findById
};

async function insert(wotChar) {
  const [id] = await db('characters').insert(wotChar);

  return db('characters')
    .where({ id })
    .first();
}
