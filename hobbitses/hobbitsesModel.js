const db = require("../data/dbConfig");

module.exports = {
  insert
  // remove
};

async function insert(hobbit) {
  const [id] = await db("hobbitses").insert(hobbit);

  return db("hobbitses")
    .where({ id })
    .first();
}
