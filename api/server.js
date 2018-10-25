const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ Message: "Hi!" });
});

server.post("/api/:user", (req, res) => {
  const { user } = req.params;
  const house = req.body.house;

  res.status(201).json({ Message: `Hello ${user}, you belong to ${house}.` });
});

server.delete("/api/:user", (req, res) => {
  const { user } = req.params;
  res.status(200).json({ Message: `${user} was removed.` });
});

module.exports = server;
