const express = require("express");
const server = express();
server.use(express.json());

let db = [{ user: "jameson" }, { user: "joe" }, { user: "will" }];

server.get("/user", () => {
  res.status(200).json(db);
});

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

//users

server.get("/users", (req, res) => {
  //   db("users")
  //     .then(users => {
  res.status(200).json({ users: "michael" });

  // })
  // .catch(error => {
  //   res
  //     .status(500)
  //     .json({ error: "The users information could not be retrieved." });
  // });
});
server.post("/name", (req, res) => {
  const { user } = req.body;
  // db.insert(user)
  //   .into("Users")
  //   .then(ids => {
  //     const id = ids[0];
  if (!user) {
    res.status(422).json({ message: "need user" });
  }
  res.status(201).json({ hello: user });
  //   })
  //   .catch(error => {
  //     res.status(500).json({
  //       error: "There was an error while saving the user to the database."
  //     });
  //   });
});
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  // db("users")
  //   .where("id", Name(id))
  //   .delete()
  //   .then(users => {
  //     if (users === 0) {
  //   res
  //     .status(404)
  //     .json({ message: "The user with the specified ID does not exist." });
  // }
  res.status(200).json({ message: `${id} has been deleted` });
  //   })
  //   .catch(error => {
  //     res.status(500).json({ error: "The user could not be deleted." });
  //   });
});

module.exports = { server, db };
