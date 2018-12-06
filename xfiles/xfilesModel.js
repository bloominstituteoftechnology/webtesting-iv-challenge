const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
}

async function insert(character) {
  const [id] = await db('xfiles').insert(character);

  return db('xfiles')
    .where({ id })
    .first(); 
}

function remove(id) {
  return db('xfiles').where({ id: id }).del();
}

function getAll() {
  return db('xfiles');
}
