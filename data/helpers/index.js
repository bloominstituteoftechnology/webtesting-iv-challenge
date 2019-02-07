const db = require("../dbConfig");

module.exports = {
  getAll,
  insert
};

async function getAll() {
  return db("users");
}

async function insert(user) {
  return db("users").insert(user);
}
