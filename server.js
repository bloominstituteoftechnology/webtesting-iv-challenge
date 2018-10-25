const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile").development;

const server = express();
const db = knex(knexConfig);

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Working" });
});

server.get("/users", (req, res) => {
  db("users")
    .then(users => res.status(200).json({ message: "Got all users", users }))
    .catch(err => res.status(500).json(err));
});

server.post("/users", (req, res) => {
  const { username, age } = req.body;
  const user = { username, age };
  db.insert(user)
    .into("users")
    .then(count =>
      res.status(201).json({ message: "User post successful", count })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, age } = req.body;
  const user = { username, age };
  db("users")
    .where({ id })
    .first()
    .update(user)
    .then(count => res.status(200).json({message: "Updated user", count}))
    .catch(err => res.status(500).json(err));
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id })
    .first()
    .del()
    .then(count => res.status(200).json({ message: "User deleted", count }))
    .catch(err => res.status(500).json(err));
});

module.exports = server;
