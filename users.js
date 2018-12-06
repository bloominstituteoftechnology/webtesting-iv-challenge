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
        .insert(users)
        .into("users");
}