const db = require('../data/dbConfig');

function getAll() {
  return db('artists');
}

async function insert(artist) {
  const id = await db('artists').insert(artist);
  return db('artists')
    .where({ id })
    .first();
}

module.exports = {
  getAll,
  insert
};
