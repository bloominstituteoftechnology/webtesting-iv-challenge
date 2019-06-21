const db = require('../data/dbConfig')

module.exports = {
    add,
    remove,
    update,
    getAll,
    findById,
};

async function add(characters) {
    return db('characters')
        .add(characters, id)
        .then(ids => {
            return db('characters')
                .where({ id: ids[0] })
                .first()
        })
}

function remove(character) {
    return db('characters')
        .del(character, 'id')
}

function getAll() {
    return db('characters');
}

async function update(id, changes) {
    return null;
}

function findById(id) {
    return null;
}
