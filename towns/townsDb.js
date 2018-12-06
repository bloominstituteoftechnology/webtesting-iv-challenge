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

function remove(town) {
    return db('town')
    .where('name', '=', town)
    .del();
}