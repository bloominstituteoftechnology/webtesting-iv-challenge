const knex = require('knex');
const knexConfig = require('../knexfile.js');

//connection to the data base
const db = knex(knexConfig.development);

module.exports = {
    find, 
    findById,
    add,
    update,
    remove

}

function find() {
    return db('users');
}

function findById(id) {
    return db('users').where({id}).first();
}

function add(course){
    return db('users')
    .insert(course)
    .into('users');
}

function update(id, changes) {
    return db('users').where({id})
    .update(changes)
}

function remove(id) {
    return db('users')
    .where({id})
    .del();
}