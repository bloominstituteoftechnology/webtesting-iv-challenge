const db = require('../data/dbConfig.js');

module.exports = {
    insert,
    // update,
    // remove,
    // getAll,
};

async function insert(user) {
    const [id] = await db('users').insert(hobbit);
    return db('users')
        .where({ id })
        .first();
}
