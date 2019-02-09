const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

async function insert(hobbit) {
    return db('hobbits').insert(hobbit);
}

async function update(id, changes) {
    return null;
}

function remove(id) {
    return null;
}

function getAll() {
    return db('hobbits');
}

function findById(id) {
    return null;
}

