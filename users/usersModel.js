const db = require("../data/dbConfig.js");

module.exports = {
fetch: () => {
  return db("users");
},
insert: (user) => {
  return db("users").insert(user);
},
remove: (id) => {
  return db("users")
    .where("id", id)
    .del();
}
};


