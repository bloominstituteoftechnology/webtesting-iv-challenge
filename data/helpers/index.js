const db = require("../dbConfig");

module.exports = {
  getAll,
  insert,
  deleteUser
};

async function getAll() {
  return db("users");
}

async function insert(user) {
  return db("users").insert(user);
}

async function deleteUser(user) {
  const { username } = user;
  return db("users")
    .where("username", username)
    .del();
}
