const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/sing", (req, res) => {
  res.status(200).send("I believe I can fly, I believe I can test an A-P-I!");
});

module.exports = server;
