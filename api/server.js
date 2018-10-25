const express = require("express");

const server = express();

server.use(express.json());

server.post("/users", (req, res) => {
  const { username, age, height } = req.body;

  res
    .status(200)
    .json({ username: `${username}`, age: `${age}`, height: `${height}` });
});

server.delete("/users/:username", (req, res) => {
  const { username } = req.params;

  res.status(200).json({ deleted: `${username}` });
});

module.exports = server;
