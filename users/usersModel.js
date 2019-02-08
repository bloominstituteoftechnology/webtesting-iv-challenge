const db = require("../data/dbConfig.js");

module.exports = {
  fetch,
  insert,
  remove
};

async function fetch() {
  return db("users");
}

async function insert(user) {
  return db("users").insert(user);
}

async function remove(id) {
  return db("users")
    .where("id", id)
    .del();
}
