const express = require("express");

const server = express();

server.use(express.json());

server.post("/users/:username", (req, res) => {
  const { username } = req.params;

  res.status(200).json({ Username: `${username}` });
});

server.delete("/users/:username", (req, res) => {
  const { username } = req.params;

  res.status(200).json({ deleted: `${username}` });
});

module.exports = server;
