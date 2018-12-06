const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
    getUsers,
    addUser,
};

function getUsers() {
    return db("users");
}

function addUser(user) {
    return db("users")
        .insert(user)
        .into("users");
}

/* 
    
    async function addUser(user) {

    const { firstName, lastName } = await db('users').insert(user);

    return db("users")
        .where({ firstName, lastName })
        .first();
}

*/
