const db = require('../data/dbConfig');

function getAll() {
  return db('artists');
}

async function insert(artist) {
  try {
    const [id] = await db('artists').insert(artist);
    return db('artists')
      .where({ id })
      .first();
  } catch (error) {
    console.log({
      error: 'There was an error inserting that artist in the db.'
    });
  }
}

async function remove(artist) {
  await db('artists')
    .where({ name: artist.name })
    .del();
  return db('artists');
}

module.exports = {
  getAll,
  insert,
  remove
};
