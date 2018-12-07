const db = require('../data/dbConfig.js');
module.exports = {
    insert,
    remove,
    getAll,
}
async function insert(character) {
    const [id] = await db('Dune').insert(character);
    return db('Dune')
        .where({ id })
        .first();
}
function remove(id) {
    return db('Dune').where({ id: id }).del();
}
function getAll() {
    return db('Dune');
}