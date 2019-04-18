const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(hobbit) {
  const id = await db ('bicycles').insert(bicycle, 'id')
  return db('bicycles')
  .where({id})
  .first()
  return null;
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('bicycles');
}

function findById(id) {
  return null;
}
