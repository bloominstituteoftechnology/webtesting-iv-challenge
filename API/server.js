const express = require("express");
const db = require("../data/dbConfig");

const server = express();

server.use(express.json());

server.post("/users", (req, res) => {
  const { firstName, lastName } = req.body;
  res.status(201).json({ hello: `${firstName} ${lastName}` });
});

server.delete("/users/:id", (req, res) => {
  res.status(200).json({ message: "user deleted" });
});

module.exports = server;
