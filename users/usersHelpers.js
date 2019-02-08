const db = require('../data/dbConfig.js');

module.exports = {
    getUsers,
    addUser
}

async function getUsers() {
    return db('users');
}

async function addUser(newUser) {
    return db('users')
        .insert(newUser);
}
