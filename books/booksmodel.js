const db = require('../data/dbConfig');

module.exports = {
    insert, remove
}

async function insert(book) {
    const [id] = await db('books').insert(book);
    return db('books')
    .where({ id })
    .first();
}

async function remove(id) {
    return db('users')
    .where('id', id)
    .del();
}