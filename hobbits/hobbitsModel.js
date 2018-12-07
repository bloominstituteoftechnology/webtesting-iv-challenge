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

function remove(id) {
    return db('hobbits')
        .where('id', Number(id))
        .del();
}