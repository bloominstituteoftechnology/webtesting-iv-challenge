const express = require("express");
const server = express();

server.use(express.json());

server.post("/users/:username", (req, res) => {
  const { username } = req.params;
  res.status(200).json({ Username: `${username}` });
});

module.exports = server;