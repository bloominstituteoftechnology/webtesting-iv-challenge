const knex = require('knex')
const knexConfig = require('../knexfile')
const db = knex(knexConfig.test)
const table = "user"

module.exports = {
    find,
    findUsernames,
    register,
    deleteUser,
    runSeed,

}

function find(){
    return db(table)
};

function findUsernames(){
    return db(table).select('username')
}

function register(user){
    const {username,password} = user
    return db(table).insert({username: "Alex", password: "password"})
}

function deleteUser(id){
    return db(table).where({id}).del()
}

function runSeed(){
    return db.seed.run()
}