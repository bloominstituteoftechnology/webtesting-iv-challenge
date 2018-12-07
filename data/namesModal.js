const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  get
};

async function insert(name) {
  // [ 1 ]
  const [id] = await db('names').insert(name);

  return db('names')
    .where({ id })
    .first();
}

async function remove(id) {
    return db('names')
      .where('id', id)
      .del();
  }

  async function get(id) {
    let query = db('names');
    if (id) {
      query.where('id', Number(id)).first();
    }
    return query;
  }


