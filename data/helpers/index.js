const db = require("../dbConfig");

module.exports = {
  getAll
};

async function getAll() {
  return db("users");
}
