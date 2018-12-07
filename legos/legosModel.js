const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  // getAll,
  // findById,
}

// Not async version
// function insert(hobbit) {
//   return db('hobbits').insert(hobbits);
// };

async function insert(legoTheme) {
  const [ id ] = await db('lego-themes').insert(legoTheme);

  return db('lego-themes')
    .where({ id })
    .first();
};