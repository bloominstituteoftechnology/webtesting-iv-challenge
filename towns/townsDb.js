const db = require('../data/db.js')

module.exports = {
    create,
    remove
}

function create(town) {
    return db('town')
    .insert(town)
    .returning('id')
}

function remove(name) {
    return db('town')
    .where('name', '=', name)
    .del();
}