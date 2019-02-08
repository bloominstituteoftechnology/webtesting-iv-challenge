const db = require('../dbConfig');

module.exports = {
    add: function(character) {
        return db('characters').insert(character);
    },

    remove: function(character) {
        return db('characters').del().where('name', character.name);
    },

}