const knex = require('knex')
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)
const table = "user"

module.exports = {
    find,

}

function find(){
    return db(table)
}
