const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

async function insert(puppies) {
  const id = await db("puppies").insert(puppies, "id");
  return db("puppies")
    .where({ id })
    .first();
  return null;
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db("puppies");
}

function findById(id) {
  return null;
}
