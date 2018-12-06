const db = require('../data/dbConfig');


module.exports = {
    insert,
    remove
}

async function insert(hobbit) {
    const [id] = await db('hobbits').insert(hobbit);
    return db('hobbits')
        .where({ id })
        .first();
};

async function remove(hobbit) {
    const [id] = await db('hobbits').delete(hobbit);
    return db('hobbits')
        .where({ id })
        .first();
}