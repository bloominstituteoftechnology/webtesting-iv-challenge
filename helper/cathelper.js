const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(cat) {
  return db('cats').insert(cat);
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('cats');
}

function findById(id) {
  return null;
}
