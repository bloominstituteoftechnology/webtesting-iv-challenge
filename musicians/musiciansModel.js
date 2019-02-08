const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
};

async function insert(musician) {
  return db('musicians').insert(musician);
}

async function remove(id) {
  return db('musicians').where(id).del();
}

function getAll() {
  return db('musicians');
}

function findById(id) {
  return db('musicians').where(id)
}