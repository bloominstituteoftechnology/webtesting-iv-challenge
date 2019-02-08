const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config['development']);

module.exports = {
    getUsers,
    addUser
}

async function getUsers() {
    return db('users');
}

async function addUser(newUser) {
    return db('users')
        .insert(newUser)
        .then(ids => ({id: ids[0]}))
}
