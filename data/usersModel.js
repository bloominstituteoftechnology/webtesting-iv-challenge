const db = require('../data/config.js');

module.exports = {
    insert,
    remove
}

async function insert(user) {
    const [id] = await db('users').insert(user);

    return db('users')
    .where({ id })
    .first();
}

async function remove(id) {
    return db('users')
    .where('id', id)
    .del();
}