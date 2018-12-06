const express = require("express");
const db = require("../data/dbConfig");

const server = express();

server.use(express.json());

server.post("/users", (req, res) => {
  const { firstName, lastName } = req.body;
  db("users")
    .insert({ firstName, lastName })
    .then(() => {
      res.status(201).json({ hello: `${firstName} ${lastName}` });
    });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id: id })
    .del()
    .then(() => {
      res.status(200).json({ message: "user deleted" });
    });
});

module.exports = server;
