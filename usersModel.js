const db = require('./data/dbConfig');

async function insert(user) {
    return db('users').insert(user);
}

async function remove(id) {
    return db('users').where(id).del();
}

function getAll() {
    return db('users');
}

function findById(id) {
    return db('users').where(id);
}

module.exports = {
    insert,
    remove,
    getAll,
    findById
};